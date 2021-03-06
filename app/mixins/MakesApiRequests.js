import axios from "axios";

export default {
    data: () => ({
        apiRoot: 'https://www.coeliacsanctuary.co.uk/api',
    }),

    methods: {
        apiSearchPlaces(searchParameters, filters, page = 1, limit = 20) {
            const params = JSON.stringify(searchParameters)
            let url = `${this.apiRoot}/wheretoeat?search=${params}`;

            Object.keys(filters).forEach((key) => {
                url += `&filter[${key}]=${filters[key]}`;
            });

            url += `&page=${page}&limit=${limit}`;

            return axios.get(encodeURI(url));
        },

        apiGetNationwidePlaces(page = 1, limit = 20) {
          return axios.get(`${this.apiRoot}/wheretoeat?page=${page}&filter[county]=1`);
        },

        apiGetVenueTypes() {
            return axios.get(`${this.apiRoot}/wheretoeat/venueTypes`);
        },

        async apiSubmitPlaceRequest(body, type = 'add') {
            let promise = null;

            await this.apiGetToken((token) => {
                promise = axios.post(`${this.apiRoot}/wheretoeat/place-request`, {
                    name: 'Through App',
                    state: type,
                    comment: body,
                }, {
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                })
            });

            return promise;
        },

        async apiSubmitPlaceRating(placeId, rating, name, email, comment) {
          let promise = null;

          await this.apiGetToken((token) => {
             promise = axios.post(`${this.apiRoot}/wheretoeat/${placeId}/reviews`, {
                 rating: rating,
                 name: name,
                 email: email,
                 comment: comment,
                 method: 'app',
             }, {
                 headers: {
                     'X-CSRF-TOKEN': token,
                 },
             });

             return promise;
          });

          return promise;
        },

        apiGetToken(callback) {
            axios.get(`${this.apiRoot}/app-request-token`).then((response) => {
                    callback(response.data.token);
                }).catch((err) => alert(err));
        }
    }
}
