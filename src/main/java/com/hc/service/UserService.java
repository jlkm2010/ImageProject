package com.hc.service;

import com.hc.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

/**
 * @author Administrator
 * @date 2015/8/24
 */
public interface UserService {

    User createOrUpdate(User user);

    User findUserById(long id);

    User findUserByUsername(String username);

    Page<User> findAll(PageRequest pageRequest);

    User update(User user);

    void deleteUser(long id);

    Page<User> findByUsernameLike(String s, PageRequest pageRequest);

    User updateUserPwd(User user, String oldPwd, String newPwd);
}
