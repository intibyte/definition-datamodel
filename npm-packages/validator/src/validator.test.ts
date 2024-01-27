import { validate, validateAgainstSchema } from './validator'

describe('validateAgainstSchema', () => {
  it('should return valid for a valid dataModel', () => {
    const schema = {
      type: 'object',
      properties: {
        property: {
          type: 'string'
        }
      },
      additionalProperties: false
    }

    const dataModel = {
      property: 'test'
    }

    const result = validateAgainstSchema(schema, dataModel)

    expect(result.valid).toBe(true)
    expect(result.errors).toBeUndefined()
  })

  it('should return invalid with errors for an invalid dataModel', () => {
    const schema = {
      type: 'object',
      properties: {
        property: {
          type: 'string'
        }
      },
      additionalProperties: false
    }

    const dataModel = {
      property: 123
    }

    const result = validateAgainstSchema(schema, dataModel)

    expect(result.valid).toBe(false)
    // expect(result.errors).not.toBeUndefined()
  })
})

describe('validate', () => {
  it('should return valid for valid 1.0 dataModel', () => {
    const dataModel = {
      'spec_version': '1.0',
      'model': {
        'version': '1.0',
        'meta': {
          'description': 'My example dataModel',
          'created_by': 'John Doe'
        },
        'namespaces': [
          {
            'name': 'content',
            'meta': {
              'description': 'Namespace for content-related entities',
              'created_by': 'John Doe'
            },
            'entities': [
              {
                'name': 'Article',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'title', 'type': 'string' },
                  { 'name': 'content', 'type': 'text' },
                  { 'name': 'published_at', 'type': 'datetime' }
                ]
              },
              {
                'name': 'Page',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'title', 'type': 'string' },
                  { 'name': 'content', 'type': 'text' },
                  { 'name': 'published_at', 'type': 'datetime' }
                ]
              },
              {
                'name': 'Comment',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'text', 'type': 'text' },
                  { 'name': 'created_at', 'type': 'datetime' },
                  { 'name': 'user_id', 'type': 'integer', 'foreign_key': true, 'references': 'interaction.User.id' },
                  { 'name': 'article_id', 'type': 'integer', 'foreign_key': true, 'references': 'content.Article.id' }
                ]
              },
              {
                'name': 'Category',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'name', 'type': 'string' }
                ]
              },
              {
                'name': 'Tag',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'name', 'type': 'string' }
                ]
              }
            ]
          },
          {
            'name': 'interaction',
            'meta': {
              'description': 'Namespace for interaction-related entities',
              'created_by': 'Alice Smith'
            },
            'entities': [
              {
                'name': 'User',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'username', 'type': 'string' },
                  { 'name': 'email', 'type': 'string' }
                ]
              },
              {
                'name': 'Like',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'created_at', 'type': 'datetime' },
                  { 'name': 'user_id', 'type': 'integer', 'foreign_key': true, 'references': 'interaction.User.id' },
                  { 'name': 'article_id', 'type': 'integer', 'foreign_key': true, 'references': 'content.Article.id' }
                ]
              }
            ]
          },
          {
            'name': 'media',
            'meta': {
              'description': 'Namespace for media-related entities',
              'created_by': 'Bob Johnson'
            },
            'entities': [
              {
                'name': 'Image',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'url', 'type': 'string' },
                  { 'name': 'description', 'type': 'text' }
                ]
              },
              {
                'name': 'Video',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'url', 'type': 'string' },
                  { 'name': 'description', 'type': 'text' }
                ]
              },
              {
                'name': 'Folder',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'name', 'type': 'string' }
                ]
              },
              {
                'name': 'File',
                'fields': [
                  { 'name': 'id', 'type': 'integer', 'primary_key': true },
                  { 'name': 'url', 'type': 'string' },
                  { 'name': 'description', 'type': 'text' },
                  { 'name': 'folder_id', 'type': 'integer', 'foreign_key': true, 'references': 'media.Folder.id' }
                ]
              }
            ]
          }
        ],
        'relationships': [
          {
            'name': 'content.Article_Comments',
            'type': 'one-to-many',
            'from': 'content.Article',
            'to': 'content.Comment',
            'from_field': 'id',
            'to_field': 'article_id'
          },
          {
            'name': 'content.Article_Category',
            'type': 'many-to-many',
            'from': 'content.Article',
            'to': 'content.Category',
            'from_field': 'id',
            'to_field': 'id',
            'through': 'content.ArticleCategory',
            'through_field_from': 'article_id',
            'through_field_to': 'category_id'
          },
          {
            'name': 'content.Article_Tags',
            'type': 'many-to-many',
            'from': 'content.Article',
            'to': 'content.Tag',
            'from_field': 'id',
            'to_field': 'id',
            'through': 'content.ArticleTag',
            'through_field_from': 'article_id',
            'through_field_to': 'tag_id'
          },
          {
            'name': 'interaction.User_Likes',
            'type': 'one-to-many',
            'from': 'interaction.User',
            'to': 'interaction.Like',
            'from_field': 'id',
            'to_field': 'user_id'
          },
          {
            'name': 'content.Article_Likes',
            'type': 'many-to-many',
            'from': 'interaction.Like',
            'to': 'content.Article',
            'from_field': 'article_id',
            'to_field': 'id',
            'through': 'interaction.ArticleLike',
            'through_field_from': 'like_id',
            'through_field_to': 'article_id'
          },
          // ... other relationships
        ]
      }
    }

    const result = validate(dataModel)

    expect(result.valid).toBe(true)
    expect(result.errors).toBeUndefined()
  })

  it('should return invalid with errors for invalid 1.0 dataModel', () => {
    const dataModel = {
      property: 'test'
    }

    const result = validate(dataModel)

    expect(result.valid).toBe(false)
    // expect(result.errors).not.toBeUndefined()
  })
})
