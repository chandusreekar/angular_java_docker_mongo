package com.stackroute.keepnote.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exceptions.UserAlreadyExistsException;
import com.stackroute.keepnote.exceptions.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.repository.UserRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */

@Service
public class UserServiceImpl implements UserService {

	/*
	 * Autowiring should be implemented for the UserRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */

	private UserRepository userRepository;

	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	/*
	 * This method should be used to save a new user.Call the corresponding method
	 * of Respository interface.
	 */

	public User registerUser(User user) throws UserAlreadyExistsException {

		User userData = userRepository.insert(user);
		if (null != userData) {
			return userData;
		} else {
			throw new UserAlreadyExistsException("user already exist");
		}

	}

	/*
	 * This method should be used to update a existing user.Call the corresponding
	 * method of Respository interface.
	 */

	public User updateUser(String userId, User user) throws UserNotFoundException {

		User userData = userRepository.findById(user.getUserId()).get();
		userData.setUserAddedDate(new Date());
		userData.setUserId(user.getUserId());
		userData.setUserMobile(user.getUserMobile());
		userData.setUserName(userData.getUserName());
		userData.setUserPassword(user.getUserMobile());

		userRepository.save(userData);
		return userData;

	}

	/*
	 * This method should be used to delete an existing user. Call the corresponding
	 * method of Respository interface.
	 */

	public boolean deleteUser(String userId) throws UserNotFoundException {

		try {
			userRepository.deleteById(userId);
			return true;
		} catch (Exception e) {
			throw new UserNotFoundException("user not found");
		}

	}

	/*
	 * This method should be used to get a user by userId.Call the corresponding
	 * method of Respository interface.
	 */
	public User getUserById(String userId) throws UserNotFoundException {

		User userData = userRepository.findById(userId).get();
		if (null != userData) {
			return userData;
		} else {
			throw new UserNotFoundException("user not found for given userid");
		}

	}

	public UserServiceImpl() {
		super();
	}

}
