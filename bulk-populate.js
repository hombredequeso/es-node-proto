
var client = require('./connection.js');

function getBulkIndexItemHeader(indexName, typeName, id) {
    return {
        index: {
            _index: indexName,
            _type: typeName,
            _id: id
        }};
}

function createDocument(id) {
    let description = `${id}`;
    return {
        description: description,
        label: "aaa",
        tags: ["zzz"]
    };
}

function indexItems(indexName, typeName, nextItem, batchSize, maxId){

    let bulkBody = [];
    let max = ((nextItem + batchSize  -1 ) < maxId) ? (nextItem + batchSize - 1): maxId;
    for (let i=nextItem; i<=max; i++) {
        bulkBody.push(getBulkIndexItemHeader(indexName, typeName, i), createDocument(i))
    }

    return client.bulk({  
        body: bulkBody
    }).then(
        function (body) {
            console.log("success");
            if (body.errors) {
                console.log("there were errors")
            }
        },
        function (error) {
            console.log(error);
        }
    );
}

Promise.resolve()
    .then(indexItems("indexb", "typeb", 1, 20000, 20000));
