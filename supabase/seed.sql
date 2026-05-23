-- Seed the 12 LBI towns in north-to-south order
insert into towns (slug, name, lat, lng, display_order) values
  ('barnegat-light',      'Barnegat Light',      39.7576, -74.1082, 1),
  ('loveladies',          'Loveladies',          39.7268, -74.1185, 2),
  ('harvey-cedars',       'Harvey Cedars',       39.7101, -74.1260, 3),
  ('north-beach',         'North Beach',         39.6929, -74.1316, 4),
  ('surf-city',           'Surf City',           39.6757, -74.1390, 5),
  ('ship-bottom',         'Ship Bottom',         39.6454, -74.1524, 6),
  ('brant-beach',         'Brant Beach',         39.6165, -74.1638, 7),
  ('beach-haven-crest',   'Beach Haven Crest',   39.5941, -74.1763, 8),
  ('brighton-beach',      'Brighton Beach',      39.5782, -74.1888, 9),
  ('spray-beach',         'Spray Beach',         39.5699, -74.1942, 10),
  ('beach-haven',         'Beach Haven',         39.5593, -74.2440, 11),
  ('holgate',             'Holgate',             39.5012, -74.2636, 12);
