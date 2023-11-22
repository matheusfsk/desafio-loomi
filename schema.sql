INSERT INTO categorias (descricao)
VALUES 
    ('Informática'), 
    ('Celulares'), 
    ('Beleza e Perfumaria'), 
    ('Mercado'), 
    ('Livros e Papelaria'), 
    ('Brinquedos'), 
    ('Moda'), 
    ('Bebê'), 
    ('Games');

INSERT INTO customers (full_name, contact, address,status, email)
VALUES
  ('Daquan Houston','1-717-318-0208','Vietnam','true','non.magna@hotmail.ca'),
  ('Uriel Gould','1-998-355-1630','Canada','false','massa@aol.edu'),
  ('Sacha Mendoza','(875) 279-3868','Sweden','false','pellentesque.sed.dictum@google.com'),
  ('Hedy Whitfield','(648) 658-0415','United States','false','lobortis.ultrices@google.couk'),
  ('Wallace Travis','1-365-553-2292','Canada','false','nunc.lectus@aol.couk'),
  ('Guy Park','1-445-903-0473','Chile','true','euismod.et@hotmail.org'),
  ('Talon Barker','1-247-371-9303','Poland','true','felis@hotmail.edu'),
  ('Sheila Higgins','(246) 328-7356','Costa Rica','true','volutpat.nunc.sit@yahoo.org'),
  ('David Atkinson','1-883-190-1904','Canada','false','ut.lacus@icloud.net'),
  ('Mufutau Kline','1-734-506-0527','Mexico','true','nisl.quisque@google.couk');

  INSERT INTO products (name, description, price, amount, category_id, image)
  VALUES
  ('Papel', 'Papel A4', 2.00, 50, 5, NULL),
  ('Tesoura', 'Tesoura sem ponta', 5.00, 10, 5, NULL);

  INSERT INTO orders (order_status, user_id, total)
  VALUES
  ('received', 20, 8.00),
  ('received', 20, 18.00);


  INSERT INTO order_items (order_id, product_id, amount, price, subtotal)
  VALUES
  (1, 1, 4, 2.00, 8.00),
  (2, 1, 4, 2.00, 8.00),
  (2, 2, 2, 5.00, 10.00);