import httpx

async def get_route_options(start_coords, end_coords):
    """
    Fetches multiple route alternatives from OSRM.
    Coordinates format: (lat, lon)
    """
    # Note the format change for OSRM: lon,lat
    url = f"http://router.project-osrm.org/route/v1/driving/{start_coords[1]},{start_coords[0]};{end_coords[1]},{end_coords[0]}"
    params = {
        "overview": "full",
        "geometries": "geojson",
        "alternatives": "true"  # Requests multiple paths
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params, timeout=10.0)
            response.raise_for_status()
            data = response.json()
            return data.get("routes", [])
        except Exception as e:
            print(f"Routing error: {e}")
            return []