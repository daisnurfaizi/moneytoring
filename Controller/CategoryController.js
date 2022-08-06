
const categoryRepository = require('../repository/categoryRepository');
const categoryService = require('../service/categoryService');
const CreateNewCategory = async (req, res) => {
    let categoryRepo = new categoryRepository();
    let categoryServices = new categoryService(categoryRepo);
    let createNewCategory = await categoryServices.createCategory(req,res);
    return createNewCategory;
}

const seacrhCategory = async (req, res) => {
    let categoryRepo = new categoryRepository();
    let categoryServices = new categoryService(categoryRepo);
    let searchCategory = await categoryServices.seacrhCategory(req,res);
    return searchCategory;
}

const updateCategory = async (req, res) => {
    let categoryRepo = new categoryRepository();
    let categoryServices = new categoryService(categoryRepo);
    let updateCategory = await categoryServices.updateCategory(req,res);
    return updateCategory;
}

const getCategorybyuser = async (req, res) => {
    let categoryRepo = new categoryRepository();
    let categoryServices = new categoryService(categoryRepo);
    let getCategorybyuser = await categoryServices.UserCategory(req,res);
    return getCategorybyuser;
}

const deleteCategory = async (req, res) => {
    let categoryRepo = new categoryRepository();
    let categoryServices = new categoryService(categoryRepo);
    let deleteCategory = await categoryServices.deleteCategory(req,res);
    return deleteCategory;
}


module.exports = {
    CreateNewCategory,
    seacrhCategory,
    updateCategory,
    getCategorybyuser,
    deleteCategory
}