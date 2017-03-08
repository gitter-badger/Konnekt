/* Build */
/* End Build */

K_Components = {};

define(['konnektdt','konnektmp','konnektl'],function(CreateData,CreateMapping,CreateLoader){

  function CreateKonnekt()
  {
    var _Loader = CreateLoader().onLoad(onComponentLoad),
        _mixed = CreateData(),
        _mapper = CreateMapping(),
        _model = _mixed({},"Model"),
        _viewmodels = {},
        _cms = {},
        _query = getQuery(),
        _ignoreList = ['id','filters','class','sessionStorage','localStorage','store','component'],
        _waitList = {};

    /* This method will Create page, Create Viewmodel, attach binds, check children, load files, rinse, repeat */
    function Konnekt(node,params,pre,post)
    {
      var __name = node.tagName.toLowerCase(),
          __mappedAttrs;

      if(params === undefined) params = [];

      /* Pre -- all about built in data this will be allocated later to seperate file */
      if(pre === undefined) pre = {};
      if(!pre.filters) pre.filters = {};
      if(!pre.sessionStorage) pre.sessionStorage = false;
      if(!pre.localStorage) pre.localStorage = false;
      if(!pre.store) pre.store = false;
      if(!pre.multiple) pre.multiple = false;

      /* post all about post set data and pointers */
      if(post === undefined) post = {};

      post.innerhtml = node.innerHTML;
      for(var x=0,len=node.attributes.length;x<len;x++)
      {
        if(['id','class'].indexOf(node.attributes[x].name) === -1) post[node.attributes[x].name] = node.attributes[x].value;
      }

      function createViewmodel(component)
      {

      }

      function mapTargets(maps,vm)
      {

      }

      function getInnerComponents()
      {

      }

      if(!_mapper.isRegistered(__name))
      {
        konnekt.loadWaitList(name,function(n,c){
          __mappedAttrs = _mapper(__name);
          mapTargets(__mappedAttrs.maps,createViewModel(_viewmodels[__name]));
          getInnerComponents(__mappedAttrs.node);
        });
        _Loader(__name);
      }
      else
      {
        __mappedAttrs = _mapper(__name);
        mapTargets(__mappedAttrs.maps,createViewModel(_viewmodels[__name]));
        getInnerComponents(__mappedAttrs.node);
      }

    }


    function getQuery()
    {
      return window.location.search.replace('?','')
      .split('&')
      .filter(function(v){return (v.length !== 0);})
      .reduce(function(o,v){
        o[v.split('=')[0]] = v.split('=')[1];
        return o;
      },{});
    }

    function onComponentLoad(name,component)
    {
      var template = "<style>"+component.prototype.k_css+"</style>"+component.prototype.k_html;
      konnekt.register(name,component,template,component.prototype.cms)
      loadWaitList(name)(name,component);
      konnekt.loadWaitList(name,function(){});
    }

    /* Registers name to a component */
    Konnekt.register = function(name,vm,template,cms)
    {
      _mapper.register(name,template);
      _viewmodels[name] = vm;
      if(cms) _cms[name] = cms;
      return Konnekt;
    }

    /* register for a component to load and be registered */
    Konnekt.loadWaitList = function(name,v){
      if(typeof v === undefined && name) return _waitList[name];
      if(name) _waitList[name] = (typeof v === 'function' ? v : _waitList[name]);
      return konnekt;
    }

    return Konnekt;
  }
  return CreateKonnekt;
});
