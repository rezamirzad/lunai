Open your browser and navigate to http://localhost:3000/login.
   2. Log in as an admin:
       * Email: admin@example.com
       * Password: password
   3. You should be redirected to http://localhost:3000/admin/dashboard.
   4. On the Admin Dashboard, locate the "User Management" form and add a new user:
       * Email: test@example.com
       * Password: testpassword
       * Role: client
   5. Click "Add User". Observe the message below the button. It should display a success message like "Success: User test@example.com added successfully.".
   6. Now, log out. You can do this by clicking the "Admin" button in the Navbar (it should now display "Admin").
   7. Navigate back to http://localhost:3000/login.
   8. Log in as the newly created client user:
       * Email: test@example.com
       * Password: testpassword
   9. You should be redirected to http://localhost:3000/client/dashboard.
   10. Log out.
   11. Try to access http://localhost:3000/admin/dashboard without logging in, or after logging in as test@example.com (client user). You should be redirected to http://localhost:3000/login or
       http://localhost:3000/unauthorized.