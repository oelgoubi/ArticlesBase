/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // List is the name of the Action
    list:function(req,res){
        Articles.find({})
        .exec((err,articles)=>{
            // console.log(articles) ; for debugging purposes
            if(err){
                res.send(500,{error:'Database Error'})
            }
            res.view('pages/list',{articles:articles} )
        });
      },
    add : function(req,res){
       res.view('pages/add')
    },
    create : function(req,res){
        const {title,body} = req.body;
        
        Articles.create({title,body}).exec( err =>{
            if(err){
                res.send(500,{erro: 'DB Error'});
            }

            res.redirect('/articles/list');
        })
    },
    delete : function(req,res){
       // Get The objetc info 
       const info =  JSON.parse(req.params.info); // we use an Object in case there is 2 params
        Articles.destroy({id : info.id}).exec(err =>{
            if(err){
                res.send(500,{erro: 'DB Error'});
            }

            res.redirect('/articles/list');
        });

        return false;
    },
    edit : function(req,res){
    
        Articles.findOne({id: req.params.id}).exec((err, article)=>{
            if(err){
                console.log(err.message);
            }

           // console.log(article);
            res.view('pages/edit',{article:article} )
        })
    },
    update : function(req,res){
        const {title,body} = req.body;
        
        Articles.update({id: req.params.id},{title,body}).exec( err =>{
            if(err){
                res.send(500,{erro: 'DB Error'});
            }

            res.redirect('/articles/list');
        });

        return false;
    }

};

