challenge (
    id,      -- INT PK 
    name,      -- VARCHAR(50)
    description, -- TEXT
    #user_id,     -- INT, NOT NULL, #FK REFERENCES user(id) 
    #game_id     -- INT, NOT NULL, #FK REFERENCES game(id)
  )


game (
    id,       -- INT PK 
    title,      -- VARCHAR(50)
    genre,      -- VARCHAR(50)
    release_year, -- DATE 
    cover,      -- TEXT 
    description   -- TEXT
  )


participation (
    id,          -- INT, PK 
    title,      -- VARCHAR(100)
    url,      -- TEXT
    #challenge_id -- INT, NOT NULL, #FK REFERENCES challenge(id)
    #user_id -- INT, NOT NULL, #FK REFERENCES user(id)
  )


user (
    id,     -- INT, PK
    username,    -- VARCHAR(50)
    email,    -- VARCHAR(255)
    password,    -- VARCHAR(255)
    avatar,    -- TEXT
    favourite game, -- VARCHAR(50)
    social1, -- TEXT
    social2, -- TEXT
    social3, -- TEXT
    role    -- VARCHAR(50)
  )

        // Tables de liaisons //

vote_participation (
     #user_id -- INT, NOT NULL, #FK REFERENCES user(id)
     #participation_id -- INT, NOT NULL, #FK REFERENCES participation(id)
     created_at,
     PRIMARY KEY (#user_id, #participation_id)
)







