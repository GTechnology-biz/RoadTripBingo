// Built-in road trip bingo items.
// Rules for this list:
//   * Only things you can spot OUTSIDE the car (no "snacks running low").
//   * Only things visible INLAND, anywhere in the country
//     (no lighthouses, beaches, or other coastal-only sights).
// Edit freely — it's loaded by app.js.
const DEFAULT_WORDS = [
  // Animals & wildlife
  "Cow", "Horse", "Sheep", "Goat", "Pig", "Donkey", "Llama or alpaca",
  "Deer", "Fox", "Rabbit", "Squirrel", "Hawk on a post", "Flock of birds",
  "Geese crossing", "Wild turkey", "Dog being walked", "Cat in a yard",
  "Herd of cattle", "Scarecrow", "Horses grazing",

  // Farms & fields
  "Red barn", "Silo", "Grain elevator", "Farmhouse", "Hay bales",
  "Cornfield", "Wheat field", "Sunflower field", "Vineyard", "Orchard",
  "Tractor in a field", "Combine harvester", "Irrigation sprinkler",
  "Farm windmill", "Long fence line", "Pumpkin patch",

  // Roadside structures
  "Water tower", "Wind turbine", "Solar panel array", "Cell tower",
  "Power lines", "Billboard", "Overpass", "Bridge", "Tunnel", "Roundabout",
  "Freight train", "Railroad crossing", "Grain elevator by tracks",
  "Construction zone", "Orange traffic cone", "Road work sign",

  // Signs
  "Speed limit sign", "Yield sign", "Stop sign", "One-way sign",
  "Detour sign", "Mile marker", "Exit sign", "\"Welcome to\" state sign",
  "Historical marker", "Deer crossing sign", "Rest area sign",
  "Adopt-a-highway sign",

  // Other vehicles
  "Semi truck", "Tanker truck", "Tow truck", "School bus", "RV or camper",
  "Motorcycle", "Convertible", "Police car", "Ambulance", "Fire truck",
  "Tractor on the road", "Car with a roof rack", "Car towing a trailer",
  "Horse trailer", "Bicyclist", "Out-of-state license plate",
  "Vanity license plate", "Funny bumper sticker", "Food truck",
  "Mail truck",

  // Buildings & roadside stops
  "Gas station", "Diner", "Motel sign", "Drive-thru", "Fast-food sign",
  "Fruit or veggie stand", "Farmers market", "Church steeple",
  "Truck stop", "Abandoned building", "Cluster of mailboxes",
  "Grain bins",

  // Landscape & sky
  "Rolling hills", "Mountain in the distance", "Pine forest", "River",
  "Lake", "Pond", "Waterfall", "Field of wildflowers", "Big rock formation",
  "Rainbow", "Hot air balloon", "Airplane overhead", "American flag",
  "Cloud shaped like an animal", "Sunset"
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DEFAULT_WORDS };
}
