type PickupOrDropPoint = string; // Unique identifier for locations
type Trip = {
    pickups: PickupOrDropPoint[];
    via?: PickupOrDropPoint; // Optional warehouse
    dropOffs: PickupOrDropPoint[];
};

function validateTrips(shipment: { pickups: PickupOrDropPoint[]; dropOffs: PickupOrDropPoint[]; }, trips: Trip[]): boolean {
    let pickupCount: { [key: string]: number } = {};
    let dropOffCount: { [key: string]: number } = {};

    // Initialize counts
    shipment.pickups.forEach(p => pickupCount[p] = (pickupCount[p] || 0) + 1);
    shipment.dropOffs.forEach(d => dropOffCount[d] = (dropOffCount[d] || 0) + 1);

    // Process each trip
    trips.forEach(trip => {
        trip.pickups.forEach(p => {
            if (!pickupCount[p]) return false; // Invalid pickup
            pickupCount[p]--;
        });

        trip.dropOffs.forEach(d => {
            if (!dropOffCount[d] || !pickupCount[d]) return false; // Invalid drop-off
            dropOffCount[d]--;
        });
    });

    // Verify all items are picked up and dropped off
    return Object.values(pickupCount).every(count => count === 0) && Object.values(dropOffCount).every(count => count === 0);
}

// Example usage
const shipment = {
    pickups: ['A', 'B'],
    dropOffs: ['C', 'D']
};

const trips: Trip[] = [
    { pickups: ['A'], dropOffs: [], via: 'W' },
    { pickups: ['B'], dropOffs: [], via: 'W' },
    { pickups: [], dropOffs: ['C'], via: 'W' },
    { pickups: [], dropOffs: ['D'], via: 'W' }
];

console.log(validateTrips(shipment, trips)); // true or false based on the validity
