package com.stackroute.keepnote.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.service.CategoryService;

/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */

@RestController
@CrossOrigin("*")
public class CategoryController {

	/*
	 * Autowiring should be implemented for the CategoryService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */

	private CategoryService categoryService;

	@Autowired
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	/*
	 * Define a handler method which will create a category by reading the
	 * Serialized category object from request body and save the category in
	 * database. Please note that the careatorId has to be unique.This handler
	 * method should return any one of the status messages basis on different
	 * situations: 1. 201(CREATED - In case of successful creation of the category
	 * 2. 409(CONFLICT) - In case of duplicate categoryId
	 *
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP POST
	 * method".
	 */

	@PostMapping("/api/v1/category")
	public ResponseEntity<Category> createCategory(@RequestBody Category category) {

		try {
			category.setCategoryCreationDate(new Date());
			Category categoryData = categoryService.createCategory(category);
			return new ResponseEntity<Category>(category, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<Category>(HttpStatus.CONFLICT);
		}

	}

	/*
	 * Define a handler method which will delete a category from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the category with specified categoryId is
	 * not found.
	 * 
	 * This handler method should map to the URL "/api/v1/category/{id}" using HTTP
	 * Delete method" where "id" should be replaced by a valid categoryId without {}
	 */

	@DeleteMapping("/api/v1/category/{id}")
	public ResponseEntity<Category> deleteCategory(@PathVariable("id") String Id)
			throws CategoryNotFoundException, CategoryDoesNoteExistsException {

		try {
			Category categoryData = categoryService.getCategoryById(Id);
			Boolean deleteUserStatus = categoryService.deleteCategory(Id);
			if (deleteUserStatus) {
				return new ResponseEntity<Category>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);

			}

		} catch (CategoryNotFoundException | CategoryDoesNoteExistsException e) {
			e.printStackTrace();
			return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
		}

	}

	/*
	 * Define a handler method which will update a specific category by reading the
	 * Serialized object from request body and save the updated category details in
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If the category updated
	 * successfully. 2. 404(NOT FOUND) - If the category with specified categoryId
	 * is not found. This handler method should map to the URL
	 * "/api/v1/category/{id}" using HTTP PUT method.
	 */

	@PutMapping("/api/v1/category/{id}")
	public ResponseEntity<Category> updateCategory(@RequestBody Category category) throws CategoryNotFoundException {

		try {
			Category categoryData = categoryService.getCategoryById(category.getId());
			try {
				Category UpdateCategory = categoryService.updateCategory(category, category.getId());
				if (null != UpdateCategory)
					return new ResponseEntity<Category>(HttpStatus.OK);
				else
					throw new Exception();
			} catch (Exception e) {
				return new ResponseEntity<Category>(HttpStatus.CONFLICT);

			}

		} catch (CategoryNotFoundException e) {
			return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
		}

	}

	/*
	 * Define a handler method which will get us the category by a userId.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category found successfully.
	 * 
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP GET
	 * method
	 */

	@GetMapping("/api/v1/category/{userId}")
	public ResponseEntity<?> getCategoryByUserId(@PathVariable("userId") String userId)
			throws CategoryNotFoundException {

		try {
			List<Category> categoryData = categoryService.getAllCategoryByUserId(userId);
			if (null != categoryData) {

				return new ResponseEntity<List<Category>>(categoryData, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("category not yet created",HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);

		}

	}
	
	@GetMapping("/hello")
	public String hello() {
		return "welcome to categoryService";
	}

}
