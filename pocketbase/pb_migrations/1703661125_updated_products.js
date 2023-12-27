/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zn6d59bvn2o1qk1")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zn6d59bvn2o1qk1")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
