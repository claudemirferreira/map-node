var sql= require('../db');

var categoriaModel={

}
categoriaModel.getAllCategoria=function(result){
    sql.query("SELECT * FROM categoria",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}

categoriaModel.insertCategoria=function(newCategoria,result)
{
    sql.query("INSERT INTO categoria SET ?",newCategoria,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
categoriaModel.findCategoriaById=function(id_categoria, result){
    sql.query("SELECT * FROM categoria WHERE id_categoria ="+id_categoria,function(err,rows){
        if(err)
            throw err;
      
        if (rows.length <= 0) {
            return result(err);
        }
        else { 
            return result(rows);
        }   
    })
}

categoriaModel.updateCategoria=function(id_categoria, categoria, result){
    sql.query("UPDATE categoria SET  ? WHERE id_categoria="+id_categoria, categoria,function(err,rows){
        if(err)
            result(err); 
       
        return result(rows);

    });
}
module.exports=categoriaModel;