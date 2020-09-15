var sql= require('../db');

var artigoModel=function(){
}

artigoModel.insertArtigo=function(newArtigo,result){
    sql.query("INSERT into artigo SET  ?",newArtigo,function(err,res,field){
        if(err){
            console.log(err);
            return result(err,null);
        }else{
            return result(null,res);
        }
    });   
}

artigoModel.getAllArtigos=function(result){
    sql.query("SELECT a.*, b.nome FROM  artigo a, categoria b where a.id_categoria = b.id_categoria ",function(err, rows, fields){
        if(err){
            return result(err,null);
        }else{
            console.log(rows);
            return result(null,rows);
        }
    });
}

artigoModel.find=function(id_categoria, result){
    sql.query("SELECT a.*, b.nome FROM  artigo a, categoria b where a.id_categoria = b.id_categoria and b.id_categoria="+id_categoria, function(err, rows, fields){
        if(err){
            return result(err,null);
        }else{
            console.log(rows);
            return result(null,rows);
        }
    });
}

artigoModel.getArtigoById=function(id_artigo, result){  

    sql.query("SELECT artigo.*, categoria.nome as nome FROM artigo LEFT JOIN categoria ON categoria.id_categoria=artigo.id_categoria WHERE artigo.id_artigo="+id_artigo,function(err,rows){
        if(err){
            console.log('##########');
            console.log(err);
            console.log('00000000');
            throw err;
        }      
        if (rows.length <= 0) {
            return result(err);
        }
        else { 
            return result(rows);
        }   
    })
}



artigoModel.updateArtigo=function(id_artigo, artigo, result){
    sql.query("UPDATE artigo SET  ? WHERE id_artigo="+id_artigo, artigo,function(err,rows){
        if(err)
            result(err);        
        return result(rows);

    });
}

module.exports=artigoModel;