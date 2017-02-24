/* SmartDS
   Copyright (C) 2017 DISIT Lab http://www.disit.org - University of Florence

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as
   published by the Free Software Foundation, either version 3 of the
   License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>. */

package dss.dbinterface;

import java.util.ArrayList;

import dss.user.User;

public interface UserDBInterface {

	public User infoUser(int id);
	public User retrieveUser(String email_login, String password_login);
	public ArrayList<String[]> getUsers();
	public boolean registerUser(String name, String email, String country, String password, int userType);
	public boolean checkUserAlreadyPresent(String email_register);
	//public Permit[] getPermits();
	public boolean modifyUser(String email, String password, String name, String country);
	public boolean modifyUserType(int userId, int type);
}
