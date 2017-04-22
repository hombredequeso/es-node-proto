DELETE indexb
{}

GET indexb/_count
{}

GET indexb/typeb/11001

POST indexb/_count
{
  "query": {
        "match": {
          "label": "bbb"
        }
  }
}

POST indexb/_update_by_query?conflicts=proceed
{
  "query": {
        "match": {
          "label": "aaa"
        }
  },
  "script": {
    "inline": "ctx._source.label = 'bbb'",
    "lang": "painless"
  }
}

POST indexb/_search
{
  "query": {
        "match": {
          "label": "aaa"
        }
  },
  "from": 10000,
  "size": 100
}

