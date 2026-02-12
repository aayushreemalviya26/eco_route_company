import httpx
from typing import Tuple, Optional

async def geocode_location(location: str) -> Optional[Tuple[float, float]]:
    """
    Using ArcGIS Geocoder - More reliable for local dev testing.
    """
    url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates"
    params = {
        "f": "json",
        "singleLine": location,
        "maxLocations": 1
    }
    
    async with httpx.AsyncClient() as client:
        try:
            # ArcGIS generally doesn't require complex User-Agents
            response = await client.get(url, params=params, timeout=10.0)
            
            if response.status_code != 200:
                print(f"ARCGIS ERROR: Status {response.status_code}")
                return None

            data = response.json()
            
            if data and data.get("candidates"):
                location_data = data["candidates"][0]["location"]
                # ArcGIS returns x (lon) and y (lat)
                lat, lon = location_data["y"], location_data["x"]
                print(f"Successfully geocoded '{location}' to ({lat}, {lon})")
                return (float(lat), float(lon))
                
            print(f"No results found for: {location}")
            return None
        except Exception as e:
            print(f"GEOCODE EXCEPTION: {str(e)}")
            return None