var client = require('./connection.js');

function indexItem(indexName, typeName, id){

    let description = `${id}`

    client.index({  
        index: indexName,
        id: id,
        type: typeName,
        body: {
            description: description,
            label: "aaa",
            tags: ["zzz"]
        }
    },function(err,resp,status) {
        console.log(resp);
    });
}

for(let i=1;i<=100;i++) {
    indexItem("indexa", "typea", i)
}

