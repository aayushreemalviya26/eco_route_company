def calculate_eco_score(elevations, distance_km):
    # 1. Calculate the total vertical climb (Positive elevation changes)
    total_climb = sum([max(0, elevations[i+1] - elevations[i]) for i in range(len(elevations)-1)])
    
    # 2. CALIBRATION: Reduce sensitivity so flat roads don't get high penalties
    # Old: elevation_coeff = 2.0 (Too high!)
    # New: Try 0.3 to 0.5. This means 1 meter of climb = 0.3 points penalty.
    elevation_coeff = 0.4 
    
    terrain_penalty = total_climb * elevation_coeff
    
    # 3. Increase the dynamic range
    # Instead of capping at 40 immediately, let's allow it to vary
    terrain_penalty = min(terrain_penalty, 60) 

    # 4. Base Score Logic
    base_score = 100
    traffic_penalty = 5 # Constant for now
    
    final_score = base_score - traffic_penalty - terrain_penalty
    
    # Calculate CO2 (120g/km average)
    co2_saved = round(distance_km * 0.12, 2)

    return {
        "eco_score": max(10, int(final_score)),
        "co2_saved_kg": co2_saved,
        "terrain_penalty": round(terrain_penalty, 1),
        "traffic_penalty": traffic_penalty,
        "distance_km": round(distance_km, 2)
    }

from datetime import datetime

def calculate_eco_score(elevations, distance_km):
    # 1. CALCULATE INCLINE PENALTY
    # We sum up the total vertical meters climbed
    total_climb = sum([max(0, elevations[i+1] - elevations[i]) for i in range(len(elevations)-1)])
    
    # CALIBRATION: Use 0.02 instead of 0.05. 
    # This means 500m climb = 10 pts penalty | 2500m climb = 50 pts penalty.
    incline_penalty = total_climb * 0.02
    incline_penalty = min(incline_penalty, 50) # Cap it at 50 so it doesn't kill the score

    # 2. CALCULATE TRAFFIC PENALTY (Heuristic)
    current_hour = datetime.now().hour
    if (8 <= current_hour <= 10) or (17 <= current_hour <= 20):
        traffic_penalty = 30
        traffic_label = "Heavy (Rush Hour)"
    elif (11 <= current_hour <= 16) or (21 <= current_hour <= 23):
        traffic_penalty = 15
        traffic_label = "Moderate"
    else:
        traffic_penalty = 5
        traffic_label = "Low (Clear)"

    # 3. FINAL FORMULA
    # Score = 100 - Incline - Traffic
    final_score = 100 - incline_penalty - traffic_penalty
    
    # Ensure a minimum score for long distances
    final_score = max(10, int(final_score))

    # CO2 saved calculation (Standard 120g/km)
    co2_saved = round(distance_km * 0.12, 2)

    return {
        "eco_score": final_score,
        "co2_saved_kg": co2_saved,
        "terrain_penalty": round(incline_penalty, 1),
        "traffic_penalty": traffic_penalty,
        "traffic_condition": traffic_label,
        "distance_km": round(distance_km, 2)
    }