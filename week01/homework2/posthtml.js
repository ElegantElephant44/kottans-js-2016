"use strict"

const PostHTML = require("posthtml")

const html =
`
    <p class="js-sqq js-saas navbar" some="new"> Hello, I am {name} of {company}</p>
    <p> I am {age} yo</p>
    <address>
        Contact me: {email}
    </address>
    <ul>
        <each key=projects>
            <li>$value</li>
        </each>
    </ul>
`

const pattern = /\{\s*(\w+)\s*\}/g
const bootstrapClasses = ['navbar','caret','label','table','img-responsive','img-rounded',
        'img-thumbnail','img-circle','sr-only','lead','text-muted','text-primary','text-warning',
        'text-danger','text-success','text-info','text-left','text-right','text-center',
        'h6','h1','h2','h3','h4','h5','page-header','list-unstyled','list-inline','initialism',
        'pull-right','prettyprint','pre-scrollable','container','row','col-lg-12','col-xs-11',
        'col-xs-1','col-xs-2','col-xs-3','col-xs-4','col-xs-5','col-xs-6','col-xs-7','col-xs-8',
        'col-xs-9','col-xs-10','col-xs-12','col-sm-11','col-sm-1','col-sm-2','col-sm-3','col-sm-4',
        'col-sm-5','col-sm-6','col-sm-7','col-sm-8','col-sm-9','col-sm-10','col-sm-12','col-sm-push-1',
        'col-sm-push-2','col-sm-push-3','col-sm-push-4','col-sm-push-5','col-sm-push-6','col-sm-push-7',
        'col-sm-push-8','col-sm-push-9','col-sm-push-10','col-sm-push-11','col-sm-pull-1',
        'col-sm-pull-2','col-sm-pull-3','col-sm-pull-4','col-sm-pull-5','col-sm-pull-6','col-sm-pull-7',
        'col-sm-pull-8','col-sm-pull-9','col-sm-pull-10','col-sm-pull-11','col-sm-offset-1',
        'col-sm-offset-2','col-sm-offset-3','col-sm-offset-4','col-sm-offset-5','col-sm-offset-6',
        'col-sm-offset-7','col-sm-offset-8','col-sm-offset-9','col-sm-offset-10','col-sm-offset-11',
        'col-md-11','col-md-1','col-md-2','col-md-3','col-md-4','col-md-5','col-md-6','col-md-7',
        'col-md-8','col-md-9','col-md-10','col-md-12','col-md-push-0','col-md-push-1','col-md-push-2',
        'col-md-push-3','col-md-push-4','col-md-push-5','col-md-push-6','col-md-push-7','col-md-push-8',
        'col-md-push-9','col-md-push-10','col-md-push-11','col-md-pull-0','col-md-pull-1','col-md-pull-2',
        'col-md-pull-3','col-md-pull-4','col-md-pull-5','col-md-pull-6','col-md-pull-7','col-md-pull-8',
        'col-md-pull-9','col-md-pull-10','col-md-pull-11','col-md-offset-0','col-md-offset-1',
        'col-md-offset-2','col-md-offset-3','col-md-offset-4','col-md-offset-5','col-md-offset-6',
        'col-md-offset-7','col-md-offset-8','col-md-offset-9','col-md-offset-10','col-md-offset-11',
        'col-lg-11','col-lg-1','col-lg-2','col-lg-3','col-lg-4','col-lg-5','col-lg-6','col-lg-7','col-lg-8',
        'col-lg-9','col-lg-10','col-lg-push-0','col-lg-push-1','col-lg-push-2','col-lg-push-3',
        'col-lg-push-4','col-lg-push-5','col-lg-push-6','col-lg-push-7','col-lg-push-8','col-lg-push-9',
        'col-lg-push-10','col-lg-push-11','col-lg-pull-0','col-lg-pull-1','col-lg-pull-2','col-lg-pull-3',
        'col-lg-pull-4','col-lg-pull-5','col-lg-pull-6','col-lg-pull-7','col-lg-pull-8','col-lg-pull-9',
        'col-lg-pull-10','col-lg-pull-11','col-lg-offset-0','col-lg-offset-1','col-lg-offset-2',
        'col-lg-offset-3','col-lg-offset-4','col-lg-offset-5','col-lg-offset-6','col-lg-offset-7',
        'col-lg-offset-8','col-lg-offset-9','col-lg-offset-10','col-lg-offset-11','table-bordered',
        'table-responsive','form-control','form-group','checkbox','checkbox-inline','input-sm','input-lg',
        'control-label','input-group-addon','form-control-static','help-block','btn','active','btn-default',
        'btn-primary','btn-warning','btn-danger','btn-success','btn-info','btn-link','btn-lg','btn-xs',
        'btn-block','fade','in','collapse','collapsing','glyphicon','dropdown','dropdown-menu','divider',
        'dropdown-header','dropdown-backdrop','btn-group-vertical','btn-group','dropdown-toggle',
        'btn-group-justified','input-group','col','input-group-btn','nav','nav-divider','nav-tabs',
        'nav-justified','nav-tabs-justified','pill-pane','navbar-header','navbar-collapse',
        'navbar-static-top','navbar-fixed-bottom','navbar-fixed-top','navbar-brand','navbar-toggle',
        'icon-bar','navbar-nav','navbar-left','navbar-right','navbar-form','navbar-btn','navbar-text',
        'navbar-default','navbar-link','navbar-inverse','breadcrumb','pagination','pager',
        'label-default','label-primary','label-success','label-info','label-warning','label-danger',
        'badge','jumbotron','thumbnail','caption','alert','alert-link','alert-dismissable','close',
        'alert-success','alert-info','alert-warning','alert-danger','progress','progress-bar',
        'progress-bar-success','progress-bar-info','progress-bar-warning','progress-bar-danger',
        'media-body','media','media-object','media-heading','pull-left','media-list','list-group',
        'list-group-item','list-group-item-heading','list-group-item-text','panel','panel-body',
        'panel-heading','panel-title','panel-footer','panel-default','panel-primary','panel-success',
        'panel-warning','panel-danger','panel-info','well','well-lg','well-sm','modal-open','modal',
        'modal-dialog','modal-content','modal-backdrop','modal-header','modal-title','modal-body',
        'modal-footer','tooltip','top','right','bottom','left','tooltip-inner','tooltip-arrow',
        'popover','popover-title','popover-content','arrow','carousel','carousel-inner','item',
        'prev','next','carousel-control','glyphicon-chevron-right','icon-next','carousel-indicators',
        'carousel-caption','hide','show','invisible','text-hide','affix','hidden','visible-xs',
        'visible-sm','visible-md','visible-lg','hidden-xs','hidden-sm','hidden-md','hidden-lg',
        'visible-print','hidden-print']
const plugin = tree => tree
    .match({ attrs: {class:true} }, node =>
    {       
        let classes = node.attrs.class
        let bootstrapClass;
        for (let i = 0; i < bootstrapClasses.length; i++) {
            bootstrapClass = bootstrapClasses[i]
            classes = classes.replace(bootstrapClass, "")
        }
        let jsDataAttrs = classes.match( /js-s*(\w+)\s*/g);
        let jsDataResultString="";
        for (let i = 0; i < jsDataAttrs.length; i++) {
            classes = classes.replace(jsDataAttrs[i],"")
            jsDataResultString = jsDataResultString.concat(jsDataAttrs[i].substring(3))
        }
        if(classes!=""){
            node.attrs.class = classes
        }
        else
        {
            delete node.attrs["class"]
        }         
        if(jsDataResultString!=""){
            node.attrs["data-js"] = jsDataResultString.trim()
        }
        return node
    })   

PostHTML([ plugin ])
    .process(html)
    .then(result =>
    {
        console.log(result.html)
    })
    .catch(console.error)