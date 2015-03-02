parseKeys = new Handler -> return (data) ->

validate = new Handler -> (data) -> true if typeof data is 'object'

parse = new Handler -> (data) -> true

transform = new Handler -> (data) -> true

deep = new Handler -> (data) -> true

mapper = new Mapper -> [
  validate
  validate -> parse -> transform
  validate -> parse -> deep Object, Array, Function, -> transform
  validate -> parse -> deep Array, -> transform
]

mapper foo:bar, bot:net:cat


mapper = new Mapper ->
  validate -> [
    parseArray -> transformArray
    parseShit -> transformShit
  ]
