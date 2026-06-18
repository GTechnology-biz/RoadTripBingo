// Built-in road trip bingo items. ~100 things commonly spotted on a road trip.
// Edit this list freely — it's loaded by app.js.
const DEFAULT_WORDS = [
  "Cow", "Horse", "Sheep", "Goat", "Dog in a car", "Deer", "Bird of prey",
  "Roadkill", "Bicyclist", "Motorcycle", "Convertible", "Police car",
  "Ambulance", "Fire truck", "School bus", "RV / camper", "Semi truck",
  "Truck honks back", "Tow truck", "Tractor", "Food truck", "Limousine",
  "Out-of-state plate", "Vanity license plate", "Car with a roof rack",
  "Boat on a trailer", "Horse trailer", "Bumper sticker", "Flat tire",
  "Car wash", "Gas station", "Rest area sign", "Toll booth", "Truck stop",
  "Drive-thru", "Fast food sign", "Billboard", "Water tower", "Windmill",
  "Wind turbine", "Solar panels", "Cell tower", "Train", "Train crossing",
  "Railroad tracks", "Bridge", "Tunnel", "Overpass", "Roundabout",
  "Construction zone", "Orange cone", "Road work sign", "Speed limit sign",
  "Yield sign", "Stop sign", "One-way sign", "Detour sign", "Mile marker",
  "Exit sign", "Welcome sign", "Historical marker", "Rest stop", "Picnic table",
  "American flag", "Lighthouse", "Barn", "Silo", "Farmhouse", "Hay bales",
  "Cornfield", "Vineyard", "Orchard", "Pond", "Lake", "River", "Waterfall",
  "Mountain", "Hill", "Forest", "Desert", "Cactus", "Palm tree", "Pine tree",
  "Field of flowers", "Rainbow", "Hot air balloon", "Airplane overhead",
  "Helicopter", "Clouds shaped like animals", "Sunset", "Full moon",
  "License plate game (your state)", "Speed trap", "Hitchhiker",
  "Person walking a dog", "Roadside fruit stand", "Diner", "Motel sign",
  "Mailbox shaped like something", "Pothole", "Traffic jam", "Brake lights",
  "Someone sleeping in the car", "Snacks running low", "Asking 'are we there yet?'"
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DEFAULT_WORDS };
}
