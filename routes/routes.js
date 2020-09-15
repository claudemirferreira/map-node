var express=require('express');
var routes= express.Router();
var controllers= require('../controllers');

//home page routes
routes.get('/',controllers.homeController.index);

//company routes
routes.get('/categoria',controllers.categoriaController.index);
routes.get('/categoria/add',controllers.categoriaController.add);
routes.post('/categoria/add',controllers.categoriaController.save);
routes.get('/categoria/edit/(:id)',controllers.categoriaController.edit);
routes.post('/categoria/edit/(:id)',controllers.categoriaController.update);

//company routes
routes.get('/artigo',controllers.artigoController.index);
routes.get('/artigo/add',controllers.artigoController.add);
routes.post('/artigo/add',controllers.artigoController.save);
routes.post('/artigo/view',controllers.artigoController.artigoDetail);
routes.get('/artigo/edit/(:id_artigo)',controllers.artigoController.edit);
routes.post('/artigo/edit/(:id_artigo)',controllers.artigoController.update);
routes.get('/artigo/find/(:id_categoria)',controllers.artigoController.find);

module.exports=routes;