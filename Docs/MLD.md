challenge (  
    id,      \-- INT PK   
    name,      \-- VARCHAR(50)  
    description, \-- TEXT  
    \#user\_id,     \-- INT, NOT NULL, \#FK REFERENCES user(id)   
    \#game\_id     \-- INT, NOT NULL, \#FK REFERENCES game(id)  
  )

game (  
    id,       \-- INT PK   
    title,      \-- VARCHAR(50)  
    genre,      \-- VARCHAR(50)  
    release\_year, \-- DATE   
    cover,      \-- TEXT   
    description   \-- TEXT  
  )

participation (  
    id,          \-- INT, PK   
    title,      \-- VARCHAR(100)  
    url,      \-- TEXT  
    \#challenge\_id \-- INT, NOT NULL, \#FK REFERENCES challenge(id)  
  )

user (  
    id,     \-- INT, PK  
    username,    \-- VARCHAR(50)  
    email,    \-- VARCHAR(255)  
    password,    \-- VARCHAR(255)  
    avatar,    \-- TEXT  
    role    \-- VARCHAR(50)  
  )

        // Tables de liaisons //

note\_participation (  
  id,                 \-- INT, PK  
  \#user\_id,            \-- INT, NOT NULL, \#FK REFERENCES user(id)  
  \#participation\_id     \-- INT, NOT NULL, \#FK REFERENCES participation(id)  
)

note\_challenge (  
  id,                 \-- INT, PK  
  \#user\_id,           \-- INT, NOT NULL, \#FK REFERENCES user(id)  
  \#challenge\_id         \-- INT, NOT NULL, \#FK REFERENCES challenge(id)  
)

