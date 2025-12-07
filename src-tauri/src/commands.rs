use std::{ops::Deref, sync::Mutex};

use serde_json::to_string;
use tauri::State;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use crate::life360::Life360;

#[tauri::command]
pub async fn get_circles(state: State<'_, Life360>) -> Result<Vec<String>, String> {
    let Ok(circles) = state.get_circles().await else {
        return Err(
            "Could not retrieve circles. Check to see if your API token is valid."
                .to_string(),
        );
    };
    let mut circle_names = Vec::new();

    for circle in circles.iter() {
        circle_names.push(circle.name().to_owned());
    }

    Ok(circle_names)
}
