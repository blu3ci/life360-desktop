use std::{ops::Deref, sync::Mutex};

use serde_json::to_string;
use tauri::State;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use crate::life360::{
    Life360, circles::{Circle, Circles}, common_types::Places
};

#[tauri::command]
pub async fn get_circles(state: State<'_, Life360>) -> Result<Circles, String> {
    let Ok(circles) = state.get_circles().await else {
        return Err(
            "Could not retrieve circles. Check to see if your API token is valid.".to_string(),
        );
    };

    Ok(circles)
}

#[tauri::command]
pub async fn get_circle_details(
    state: State<'_, Life360>,
    circle_id: &str,
) -> Result<Circle, String> {
    let Ok(circle) = state.get_circle_details(circle_id).await else {
        return Err(
            "Could not retrieve circle. Check to see if your API token is valid.".to_string(),
        );
    };

    Ok(circle)
}

#[tauri::command]
pub async fn get_places(
    state: State<'_, Life360>,
    circle_id: &str,
) -> Result<Places, String> {
    let Ok(places) = state.get_places(circle_id).await else {
        return Err(
            "Could not retrieve circle. Check to see if your API token is valid.".to_string(),
        );
    };

    Ok(places)
}
