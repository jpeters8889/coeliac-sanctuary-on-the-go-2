export default {
    methods: {
        findIndexByAttribute(array, attribute, value) {
            for (let i = 0; i < array.length; i += 1) {
                if (array[i][attribute] === value) {
                    return i;
                }
            }
            return -1;
        }
    }
}
