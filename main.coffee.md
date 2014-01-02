Storage
=======

A wrapper on the Local Storage API 

Store an object in local storage.

Methods
-------

`set`

You can store strings

>     Storage.set('name', 'Matt')

Numbers

>     Storage.set('age', 26)

Even objects

>     Storage.set('person', {name: 'Matt', age: 26})

    store = (key, value) ->
      localStorage[key] = JSON.stringify(value)

      return value

`get` retrieves an object from local storage.

>     Storage.get('name')
>     # => 'Matt'

>     Storage.get('age')
>     # => 26
  
>     Storage.get('person')
>     # => { age: 26, name: 'Matt' }
  
    retrieve = (key) ->
      value = localStorage[key]
  
      if value?
        JSON.parse(value)

    module.exports =
      get: retrieve
      set: store
      put: store

Access an instance of Storage with a specified prefix.

Returns an interface to local storage with the given prefix applied.

      new: (prefix) ->
        prefix ||= ""
  
        get: (key) ->
          retrieve("#{prefix}_#{key}")
        set: (key, value) ->
          store("#{prefix}_#{key}", value)
        put: (key, value) ->
          store("#{prefix}_#{key}", value)
