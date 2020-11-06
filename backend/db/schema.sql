create table if not exists user (
    user_id int not null auto_increment primary key,
    google_id varchar(128) not null,
    email varchar(128) not null,
    first_name varchar(128),
    last_name varchar(128),
    photo_url varchar(128) 
);

create table if not exists category (
    category_id int not null auto_increment primary key,
    category_name varchar(128) not null
);

create table if not exists `group` (
    group_id int not null auto_increment primary key,
    user_id int not null,
    category_id int not null,
    group_name varchar(128) not null,
    group_description TEXT,
    created_at DATETIME,
    foreign key (user_id) REFERENCES user(user_id),
    foreign key (category_id) REFERENCES category(category_id)
);

create table if not exists group_comment (
    gc_id int not null auto_increment primary key,
    user_id int not null,
    group_id int not null,
    reply_id int,
    comment_content TEXT not null,
    created_at DATETIME,
    foreign key (user_id) REFERENCES user(user_id),
    foreign key (group_id) REFERENCES `group`(group_id),
    foreign key (reply_id) REFERENCES group_comment(gc_id)
);

create table if not exists blog_post (
    bp_id int not null auto_increment primary key,
    user_id int not null,
    group_id int not null,
    post_content TEXT not null,
    created_at DATETIME,
    foreign key (user_id) REFERENCES user(user_id),
    foreign key (group_id) REFERENCES `group`(group_id)
);

create table if not exists blog_comment (
    bc_id int not null auto_increment primary key,
    user_id int not null,
    group_id int not null,
    reply_id int,
    comment_content TEXT not null,
    created_at DATETIME,
    foreign key (user_id) REFERENCES user(user_id),
    foreign key (group_id) REFERENCES `group`(group_id),
    foreign key (reply_id) REFERENCES blog_comment(bc_id)
);

create table if not exists membership (
    membership_id int not null auto_increment primary key,
    user_id int not null,
    group_id int not null,
    updated_at DATETIME,
    state varchar(128), 
    type varchar(128) not null,
    foreign key (user_id) REFERENCES user(user_id),
    foreign key (group_id) REFERENCES `group`(group_id)
);