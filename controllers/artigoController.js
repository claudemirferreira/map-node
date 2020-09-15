var artigoModel = require('../models/artigoModel');
var categoriaModel = require('../models/categoriaModel');
const dateFormat = require('dateformat');

var artigoController = function () {
}

artigoController.index = function (req, res, next) {
    artigoModel.getAllArtigos(function (err, artigos) {
        if (err) {
            throw err;
        } else {
            
            categoriaModel.getAllCategoria(function(err,categorias){
                res.render('artigo/index',{title: 'artigo Listing',categorias:categorias, artigos: artigos});
            });
            //res.render('artigo/index', { title: 'artigo Listing', artigos: artigos });
        }
    });
}

artigoController.find = function (req, res, next) {
    var id_categoria = req.body.id_categoria;
    artigoModel.find(id_categoria, function (err, artigos) {
        if (err) {
            throw err;
        } else {
            res.render('artigo/index', { title: 'artigo Listing', artigos: artigos });
        }
    });
}

artigoController.add = function (req, res, next) {
    categoriaModel.getAllCategoria(function (err, categorias) {
        res.render('artigo/add', { title: 'Add artigo', categorias: categorias });
    });
}

artigoController.save = function (req, res, next) {
    req.assert('titulo', 'titulo is required.').notEmpty();
    req.assert('descricao', 'descricao is required.').notEmpty()
    req.assert('categoria', 'categoria must be selected.').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        var newArtigo = {
            titulo: req.sanitize('titulo').escape().trim(),
            descricao: req.sanitize('descricao').escape().trim(),
            id_categoria: req.sanitize('categoria').escape().trim()
        }
        console.log(newArtigo);
        artigoModel.insertArtigo(newArtigo, function (err) {
            if (err) {
                req.flash('error', 'There was error in inserting data');
            } else {
                req.flash('success', 'artigo added succesfully');
            }
            res.redirect('/artigo');
        });
    } else {
        var err_msg = "";
        errors.forEach(function (err) {
            err_msg += err.msg + "<br/>";
        })
        categoriaModel.getAllCategoria(function (err, categorias) {
            req.flash('error', err_msg);
            res.render('artigo/add', { title: 'Add artigo', categorias: categorias });
        });
    }
}

artigoController.artigoDetail = function (req, res) {
    var artigo_id = req.body.artigo_id;
    var response={};
    artigoModel.getArtigoById(artigo_id, function (result) {
        if (result == null) {
            response.status=0;
            response.data={};
            response.message="No artigo details found";
        } else {
            response.status=1;
            response.data=result;
            response.message="artigo found";
        }
        res.send(JSON.stringify(response));
    })
}

artigoController.edit=function(req,res){
    var id_artigo= req.params.id_artigo;
   artigoModel.getArtigoById(id_artigo,function(result){
    if(result==null){
        req.flash('error','Sorry the artigo doesnot exists!!');
        res.redirect('/artigo');
    }else{
        categoriaModel.getAllCategoria(function(err,categorias){
            res.render('artigo/edit',{title: 'Edit artigo',categorias:categorias, artigo:result[0]});
        });
    }
   });
}

artigoController.update=function(req,res){
    var id_artigo=req.params.id_artigo;
    console.log(id_artigo);
    req.assert('titulo', 'titulo is required.').notEmpty();
    req.assert('descricao', 'descricao is required.').notEmpty()
    req.assert('categoria', 'categoria must be selected.').notEmpty();
    var errors = req.validationErrors();

    if( !errors ) {
        var newArtigo = {
            id_artigo: id_artigo,
            titulo: req.sanitize('titulo').escape().trim(),
            descricao: req.sanitize('descricao').escape().trim(),
            id_categoria: req.sanitize('categoria').escape().trim()
        }

        artigoModel.updateArtigo(id_artigo, newArtigo,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'artigo Information update successfully.');
                    res.redirect('/artigo');
                }else{
                    req.flash('error', 'There was error in updating artigo.');
                    res.redirect('/artigo/edit/'+id_artigo);  
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.redirect('/artigo/edit/'+id_artigo);
    }
}


module.exports = artigoController;