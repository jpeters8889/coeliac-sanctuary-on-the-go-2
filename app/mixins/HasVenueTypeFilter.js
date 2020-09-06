export default {
    data: () => ({
        venueTypes: [
            {
                label: 'Eateries',
                id: 1,
                filters: [],
            },
            {
                label: 'Attractions',
                id: 2,
                filters: [],
            },
            {
                label: 'Hotels / B&Bs',
                id: 3,
                filters: [],
            }
        ],
    }),

    mounted() {
        this.$root.$on('filters-changed', (filters) => {
            this.venueTypes = filters;
        });
    },

    methods: {
        loadVenueTypes(callback, enabledFilters = null) {
            this.apiGetVenueTypes().then((response) => {
                response.data.forEach((venueType) => {
                    const result = this.venueTypes.find((data) => data.id === venueType.type_id);
                    const index = this.venueTypes.indexOf(result);

                    if(index < 0) {
                        return;
                    }

                    let isSelected = true;

                    if(enabledFilters && !enabledFilters.includes(venueType.id)) {
                        isSelected = false
                    }

                    this.venueTypes[index].filters.push({
                        id: venueType.id,
                        label: venueType.label,
                        selected: isSelected,
                    });
                });

                this.venueTypes.map((venueType) => {
                   venueType.filters.sort((a, b) => (a.label > b.label) ? 1 : -1);
                });

                callback();
            }).catch((err) => alert(err));
        },

        getFilters() {
            const enabledFilters = [];

            this.venueTypes.forEach((venueType) => {
                venueType.filters
                    .filter((filter) => filter.selected)
                    .forEach((filter) => {
                        enabledFilters.push(filter.id);
                    });
            });

            return enabledFilters.join();
        }
    }
}
