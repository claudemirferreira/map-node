var categoriaModel= require('../models/categoriaModel');
var categoriaController=function(){}

categoriaController.index=function(req,res,next){
    categoriaModel.getAllCategoria(function(err,categorias){
        if(err){
                throw err;
        }else{
            res.render('categoria/index',{title:'categoria Listing',categorias:categorias});
        }
       
    });
}
categoriaController.add=function(req,res,next){
    res.render('categoria/add',{title:'Add categoria'});
}
categoriaController.save=function(req,res){
    req.assert('nome', 'nome is required').notEmpty();    
 
    var errors = req.validationErrors();
    if( !errors ) {
        var newTask={
            nome:req.sanitize('nome').escape().trim(),
        }
        categoriaModel.insertCategoria(newTask,function(err){
            if(err){
                req.flash('error','There was error in inserting data');
        }else{
            req.flash('success','categoria added succesfully');
        }
        res.redirect('/categoria');
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.render('categoria/add',{title:'Add categoria'});
    }
}
categoriaController.edit=function(req,res){
    var categoriaId=req.params.id;
    categoriaModel.findCategoriaById(categoriaId,function(result){
        if(result==null){
            req.flash('error','Sorry the categoria doesnot exists!!');
            res.redirect('/categoria');
        }else{
          res.render('categoria/edit',{title:'Edit categoria',categoria:result});
        }
    })
}

categoriaController.update=function(req,res){
    var categoriaId=req.params.id;
    req.assert('nome', 'nome is required').notEmpty(); 
    var errors = req.validationErrors();
    if( !errors ) {
        var categoria={
            nome:req.sanitize('nome').escape().trim(),
        }
        categoriaModel.updateCategoria(categoriaId,categoria,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'categoria Information update successfully.');
                    res.redirect('/categoria');
                }else{
                    req.flash('error', 'There was error in updating categoria.');
                    res.redirect('/categoria/edit/'+categoriaId);  
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.redirect('/categoria/edit/'+categoriaId);
    }
}


module.exports=categoriaController;