I want an app build with Vue.js (possibly Quasar framework) but I want it to be able to run as a desktop app (probably
using Electron, but not necessarily). The app should be read files and save files. These files should be in JSON format.
Each of these files should describe a database datamodel (entities, attributes and relationships between entities). The
app should allow the user to model the database datamodel in graphical way (maybe some sort of a UML diagram or
something). Once the user is done, he should be able to save his datamodel in JSON file. Later, the user should be able
to open that file once again and edit the datamodel and save the file again.

These JSON files should follow this JSON schema:
{
"$schema": "http://json-schema.org/draft-07/schema#",
"type": "object",
"properties": {
"spec_version": {
"type": "string",
"const": "1.0"
},
"model": {
"type": "object",
"properties": {
"version": {
"type": "string",
"pattern": "^\\d+\\.\\d+$"
},
"meta": {
"type": "object",
"additionalProperties": true
},
"namespaces": {
"type": "array",
"items": {
"type": "object",
"properties": {
"name": {
"type": "string",
"pattern": "^([a-z][a-zA-Z0-9_]*)+(\\.([A-Z_][a-zA-Z0-9_]*))*$"
},
"meta": {
"type": "object",
"additionalProperties": true
},
"entities": {
"type": "array",
"items": {
"type": "object",
"properties": {
"name": {
"type": "string",
"pattern": "^[A-Z][a-zA-Z0-9_]*$"
},
"fields": {
"type": "array",
"items": {
"type": "object",
"properties": {
"name": {
"type": "string",
"pattern": "^[a-z][a-zA-Z0-9_]*$"
},
"type": {
"type": "string"
},
"primary_key": {
"type": "boolean"
},
"foreign_key": {
"type": "boolean"
},
"references": {
"type": "string"
}
},
"required": [
"name",
"type"
]
}
}
},
"required": [
"name",
"fields"
]
}
}
},
"required": [
"name",
"entities"
]
}
},
"relationships": {
"type": "array",
"items": {
"type": "object",
"properties": {
"name": {
"type": "string",
"pattern": "^[a-z][a-zA-Z0-9_]*$"
},
"type": {
"type": "string",
"enum": [
"one-to-one",
"one-to-many",
"many-to-one",
"many-to-many"
]
},
"from": {
"type": "string"
},
"to": {
"type": "string"
},
"from_field": {
"type": "string"
},
"to_field": {
"type": "string"
},
"through": {
"type": "string"
},
"through_field_from": {
"type": "string"
},
"through_field_to": {
"type": "string"
}
},
"required": [
"name",
"type",
"from",
"to",
"from_field",
"to_field"
]
}
}
},
"required": [
"version",
"namespaces"
],
"additionalProperties": false
}
},
"required": [
"spec_version",
"model"
],
"additionalProperties": false
}

Example of a JSON file is here:
{
"spec_version": "1.0",
"model": {
"version": "1.0",
"meta": {
"description": "My example datamodel",
"created_by": "John Doe"
},
"namespaces": [
{
"name": "content",
"meta": {
"description": "Namespace for content-related entities",
"created_by": "John Doe"
},
"entities": [
{
"name": "Article",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "title",
"type": "string"
},
{
"name": "content",
"type": "text"
},
{
"name": "published_at",
"type": "datetime"
}
]
},
{
"name": "Page",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "title",
"type": "string"
},
{
"name": "content",
"type": "text"
},
{
"name": "published_at",
"type": "datetime"
}
]
},
{
"name": "Comment",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "text",
"type": "text"
},
{
"name": "created_at",
"type": "datetime"
},
{
"name": "user_id",
"type": "integer",
"foreign_key": true,
"references": "interaction.User.id"
},
{
"name": "article_id",
"type": "integer",
"foreign_key": true,
"references": "content.Article.id"
}
]
},
{
"name": "Category",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "name",
"type": "string"
}
]
},
{
"name": "Tag",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "name",
"type": "string"
}
]
}
]
},
{
"name": "interaction",
"meta": {
"description": "Namespace for interaction-related entities",
"created_by": "Alice Smith"
},
"entities": [
{
"name": "User",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "username",
"type": "string"
},
{
"name": "email",
"type": "string"
}
]
},
{
"name": "Like",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "created_at",
"type": "datetime"
},
{
"name": "user_id",
"type": "integer",
"foreign_key": true,
"references": "interaction.User.id"
},
{
"name": "article_id",
"type": "integer",
"foreign_key": true,
"references": "content.Article.id"
}
]
}
]
},
{
"name": "media",
"meta": {
"description": "Namespace for media-related entities",
"created_by": "Bob Johnson"
},
"entities": [
{
"name": "Image",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "url",
"type": "string"
},
{
"name": "description",
"type": "text"
}
]
},
{
"name": "Video",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "url",
"type": "string"
},
{
"name": "description",
"type": "text"
}
]
},
{
"name": "Folder",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "name",
"type": "string"
}
]
},
{
"name": "File",
"fields": [
{
"name": "id",
"type": "integer",
"primary_key": true
},
{
"name": "url",
"type": "string"
},
{
"name": "description",
"type": "text"
},
{
"name": "folder_id",
"type": "integer",
"foreign_key": true,
"references": "media.Folder.id"
}
]
}
]
}
],
"relationships": [
{
"name": "content.Article_Comments",
"type": "one-to-many",
"from": "content.Article",
"to": "content.Comment",
"from_field": "id",
"to_field": "article_id"
},
{
"name": "content.Article_Category",
"type": "many-to-many",
"from": "content.Article",
"to": "content.Category",
"from_field": "id",
"to_field": "id",
"through": "content.ArticleCategory",
"through_field_from": "article_id",
"through_field_to": "category_id"
},
{
"name": "content.Article_Tags",
"type": "many-to-many",
"from": "content.Article",
"to": "content.Tag",
"from_field": "id",
"to_field": "id",
"through": "content.ArticleTag",
"through_field_from": "article_id",
"through_field_to": "tag_id"
},
{
"name": "interaction.User_Likes",
"type": "one-to-many",
"from": "interaction.User",
"to": "interaction.Like",
"from_field": "id",
"to_field": "user_id"
},
{
"name": "content.Article_Likes",
"type": "many-to-many",
"from": "interaction.Like",
"to": "content.Article",
"from_field": "article_id",
"to_field": "id",
"through": "interaction.ArticleLike",
"through_field_from": "like_id",
"through_field_to": "article_id"
}
]
}
}
