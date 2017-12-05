const odyssey = {
    countMap: [
        {
            min: 0,
            color: '#00FF00'
        },
        {
            min: 7,
            color: '#FEF100'
        },
        {
            min: 13,
            color: '#FFA500'
        },
        {
            min: 20,
            color: '#FF0000'
        },
        {
            min: 30,
            color: '#900707'
        },
        {
            min: 40,
            color: '#470707'
        }
    ],
    forBeersPerPlace(count, locations) {
        let groups = this.countMap.map(mapping => ({ color: mapping.color, locations: [] }));

        locations.forEach((location, index, arr) => {
            const beersAt = (index + 1) * count;
            const color = this.mapToColor(beersAt);

            groups.find(group => group.color == color).locations.push(location);
        });

        groups = groups.filter(group => group.locations.length > 0);

        const groupCount = groups.length;

        const routes = [];

        for (let i = 0; i < groupCount; ++i) {
            if ((i == groupCount - 1) && (groups[i].length == 0)) {
                break;
            }

            const locCount = groups[i].locations.length;

            const start = groups[i].locations[0];

            let end;

            if (i == groupCount - 1) {
                 end = groups[i].locations[locCount - 1];
            } else {
                end = groups[i + 1].locations[0];
            }

            const waypoints = groups[i].locations.slice(1, locCount - 1)
                .map(location => ({ location }));

            routes.push({
                origin: this.locationToArray(start),
                destination: this.locationToArray(end),
                waypoints,
                strokeColor: groups[i].color
            });
        }

        return routes;
    },
    mapToColor(count) {
        let selected = this.countMap[0];

        for (const mapping of this.countMap) {
            if (count >= mapping.min) {
                selected = mapping;
            } else {
                break;
            }
        }

        return selected.color;
    },
    locationToArray(location) {
        return [location.lat, location.lng];
    }
};

module.exports = {
    odyssey
};
