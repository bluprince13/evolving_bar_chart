import * as d3 from 'd3';
import Papa from 'papaparse';
import csvString from "../data/gdp";

const data = Papa.parse(csvString, {
    header: true,
    dynamicTyping: true
})['data']

const startTime = 1970
const endTime = 2018
const categoryField = 'Country Name'
const top = 10

function convert(list_of_dicts) {
    var map = {};
    list_of_dicts.forEach((dict) => {
        for (var t = startTime; t <= endTime; t++) {
            const category = dict[categoryField]
            const value = dict[t]

            if (!map[t]) 
                map[t] = [];

            map[t].push({
                'category': category, 
                'value': value
            });
        }    
    });
    return map
}

function sort(list) {
    const sorted = list.sort(function(a, b) {
        return b['value'] - a['value'];
    });
    return sorted
}

function rank(sorted_list, top) {
    var ranked_list = []
    sorted_list.slice(0, top).forEach((dict, index) => {
        dict['rank'] = index + 1
        ranked_list.push()
    })
    return sorted_list.slice(0, top)
}

var map = convert(data);
for (var t = startTime; t <= endTime; t++) {
    map[t] = rank(sort(map[t]), top)
}    

export default map
