-- Insert sample tours
INSERT INTO public.tours (title, description, short_description, price, duration_hours, max_participants, difficulty_level, features, image_urls, location) VALUES
('Aventure Quad dans le Désert', 'Explorez les dunes dorées du désert tunisien lors d''une aventure quad inoubliable. Découvrez des paysages à couper le souffle et vivez des sensations fortes.', 'Quad dans les dunes du désert tunisien', 89.99, 3, 8, 'moderate', '{"guide_professionnel", "équipement_fourni", "photos_incluses", "rafraîchissements"}', '{"tunisian-desert-quad-bikes.png", "tunisian-desert-quad-bike-sunset.png"}', 'Hammamet, Tunisie'),

('Safari Quad Coucher de Soleil', 'Vivez la magie du coucher de soleil dans le désert lors de cette excursion quad unique. Une expérience romantique et aventureuse.', 'Safari quad au coucher de soleil', 119.99, 4, 6, 'easy', '{"coucher_de_soleil", "guide_professionnel", "photos_incluses", "dîner_traditionnel"}', '{"tunisian-desert-quad-bikes-sunset.png", "tunisia-quad-bike-panorama.png"}', 'Hammamet, Tunisie'),

('Quad Adventure Oasis', 'Découvrez les oasis cachées de la Tunisie lors de cette aventure quad exceptionnelle. Explorez la nature préservée et les sources naturelles.', 'Exploration des oasis en quad', 99.99, 5, 8, 'moderate', '{"oasis_exploration", "baignade_autorisée", "guide_professionnel", "déjeuner_inclus"}', '{"quad-bikes-tunisian-oasis.png", "tunisia-quad-bikes.png"}', 'Hammamet, Tunisie'),

('Quad Extrême Dunes', 'Pour les amateurs de sensations fortes ! Dévalez les plus hautes dunes du désert tunisien dans cette aventure quad extrême.', 'Quad extrême dans les grandes dunes', 149.99, 6, 4, 'hard', '{"sensations_fortes", "grandes_dunes", "guide_expert", "équipement_sécurité"}', '{"tunisian-desert-quad-bikes.png", "tunisia-quad-bike-panorama.png"}', 'Hammamet, Tunisie'),

('Initiation Quad Famille', 'Parfait pour les familles ! Une initiation douce au quad dans un environnement sécurisé et adapté aux débutants.', 'Initiation quad pour toute la famille', 69.99, 2, 10, 'easy', '{"adapté_familles", "enfants_acceptés", "formation_incluse", "parcours_sécurisé"}', '{"tunisia-quad-bikes.png", "quad-bikes-tunisian-oasis.png"}', 'Hammamet, Tunisie');

-- Insert system settings
INSERT INTO public.system_settings (setting_key, setting_value, description) VALUES
('site_maintenance', '{"enabled": false, "message": "Site en maintenance"}', 'Mode maintenance du site'),
('booking_settings', '{"advance_booking_days": 30, "cancellation_hours": 24, "max_participants_per_booking": 8}', 'Paramètres de réservation'),
('payment_settings', '{"accepted_methods": ["card", "paypal", "cash"], "currency": "EUR", "tax_rate": 0.2}', 'Paramètres de paiement'),
('email_settings', '{"smtp_host": "", "smtp_port": 587, "from_email": "noreply@hammetadventure.com"}', 'Paramètres email'),
('social_media', '{"facebook": "", "instagram": "", "twitter": "", "youtube": ""}', 'Réseaux sociaux');

-- Create an admin user (you'll need to update this with a real user ID after signup)
-- This is just a placeholder - in real usage, you'd update an existing user's role
-- INSERT INTO public.user_profiles (id, first_name, last_name, role, permissions) 
-- VALUES ('your-admin-user-id-here', 'Admin', 'User', 'admin', '{"manage_users", "manage_bookings", "manage_tours", "view_analytics"}');
