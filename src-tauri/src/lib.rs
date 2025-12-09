use std::sync::Mutex;

use life360::Life360;
use tauri::Manager;

mod commands;
mod life360;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    dotenvy::dotenv().unwrap();

    tauri::Builder::default()
        .manage(Life360::new(
            std::env::var("API_KEY")
                .expect("Environment var `API_KEY` needs to be defined")
                .as_str(),
        ))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_circles,
            commands::get_circle_details,
            commands::get_places
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
