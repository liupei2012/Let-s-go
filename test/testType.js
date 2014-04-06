var assert = require("assert");
var mongoose = require('../models/db');
var request = require('supertest');
var app = require('../app');
var classifyModel = mongoose.model('classifys');
var sub_classifyModel = mongoose.model('sub_classifys');
var ObjectID = require('mongodb').ObjectID;
var ClassId = [];

describe('test Type', function() {
	before(function() {
		classifyModel.remove(function() {
			console.log("clear db");
		});
		sub_classifyModel.remove(function(){
			console.log();
		})
	})
	var typeArray = ["运动", "聚会", "娱乐", "文艺", "其它"];
	describe('#insert', function() {
		it('should return null when the value is inserted', function() {
			typeArray.forEach(function(elem) {
				classifyModel.savetype(elem,function(err, result) {
					ClassId.push(result._id.valueOf());
					assert.equal(null, err);
				});
			});
		})
	});
	describe('#findAll', function() {
		it('should delete all result when execute', function() {
			classifyModel.findAll(function(err, docs) {
				docs.length.should.equal(5);
			});
		})
	});
	describe('#findbyid',function(){
		it('should return one result by pass id',function(){
			classifyModel.getByid(ClassId[0],function(err,res){
				res.name.should.equal("运动");
			});
		})
	})
	after(function() {
		classifyModel.remove(function() {
			console.log("clear db");
		});
	})
})

describe('test sub_Type', function() {
	var supid;
	var sub_typeArray = ["篮球", "足球", "羽毛球", "兵乓球", "游泳","台球","瑜伽"];
	describe('#insert', function() {
		it('should return null when the value is inserted', function() {
			classifyModel.savetype("运动",function(err,res){
				supid = res._id.valueOf();
				sub_typeArray.forEach(function(elem){
					sub_classifyModel.save(elem,res,function(err,docs){
						if(err){
							return
						}
						assert.equal(err,null);
					});
				});
			});
		})
	});
	describe('#find subtype by superid', function() {
		it('should return all subtype in supertype', function() {
			sub_classifyModel.getByid(supid,function(err, docs) {
				docs.length.should.equal(sub_typeArray.length);
			});
		})
	});
	/*
	describe('#findbyid',function(){
		it('should return one result by pass id',function(){
			classifyModel.getByid(ClassId[0],function(err,res){
				res.name.should.equal("运动");
			});
		})
	})
	after(function() {
		classifyModel.remove(function() {
			console.log("clear db");
		});
	})*/
})