from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio
from fastapi.middleware.cors import CORSMiddleware

# Import your services
from services.geocoding import geocode_location
from services.routing import get_route_options # Updated name
from services.elevation import get_elevations
from services.eco_score import calculate_eco_score

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (Vite, local, etc.)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (POST, GET, etc.)
    allow_headers=["*"],
)    

class RouteRequest(BaseModel):
    start: str
    end: str

@app.post("/api/analyze-route")
async def analyze_best_route(request: RouteRequest):
    # 1. Geocode Start and End
    start_coords = await geocode_location(request.start)
    end_coords = await geocode_location(request.end)
    
    if not start_coords or not end_coords:
        raise HTTPException(status_code=400, detail="Could not find locations.")

    # 2. Get multiple route options
    routes = await get_route_options(start_coords, end_coords)
    if not routes:
        raise HTTPException(status_code=400, detail="No routes found.")

    scored_routes = []

    # 3. Analyze each route to find the most eco-friendly one
    for route in routes:
        geometry = route["geometry"]["coordinates"]
        distance_km = route["distance"] / 1000
        
        # Get elevations for this specific path
        elevations = await get_elevations(geometry)
        
        # Calculate score
        analysis = calculate_eco_score(elevations, distance_km)
        
        scored_routes.append({
            "eco_score": analysis["eco_score"],
            "data": {
                "start_coords": start_coords,
                "end_coords": end_coords,
                "route_geometry": geometry,
                "distance_km": analysis["distance_km"],
                "eco_score": analysis["eco_score"],
                "co2_saved_kg": analysis["co2_saved_kg"],
                "terrain_penalty": analysis["terrain_penalty"],
                "traffic_penalty": analysis["traffic_penalty"]
            }
        })

    # 4. Sort by Eco-Score (Highest first) and pick the best
    scored_routes.sort(key=lambda x: x["eco_score"], reverse=True)
    best_option = scored_routes[0]["data"]

    return best_option