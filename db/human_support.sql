-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2016 at 09:32 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `human_support`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
`comment_id` int(11) NOT NULL,
  `contents` varchar(500) NOT NULL,
  `date_sent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `comment_types`
--

CREATE TABLE IF NOT EXISTS `comment_types` (
`type_id` int(11) NOT NULL,
  `comment_type` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
`message_id` int(11) NOT NULL,
  `contents` varchar(500) NOT NULL,
  `date_sent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE IF NOT EXISTS `profiles` (
`profile_id` int(11) NOT NULL,
  `first_name` varchar(10) NOT NULL,
  `last_name` varchar(10) NOT NULL,
  `email` varchar(25) NOT NULL,
  `phone_number` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE IF NOT EXISTS `tickets` (
  `ticket_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL DEFAULT '1',
  `requestor_id` int(11) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `priority_id` int(11) NOT NULL DEFAULT '1',
  `stack_id` int(11) NOT NULL DEFAULT '1',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `subject` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tickets_2_comments`
--

CREATE TABLE IF NOT EXISTS `tickets_2_comments` (
`t2c_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tickets_2_messages`
--

CREATE TABLE IF NOT EXISTS `tickets_2_messages` (
`t2m_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_priority`
--

CREATE TABLE IF NOT EXISTS `ticket_priority` (
`priority_id` int(11) NOT NULL,
  `priority` varchar(25) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `ticket_priority`
--

INSERT INTO `ticket_priority` (`priority_id`, `priority`) VALUES
(1, 'Unassigned');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_stack`
--

CREATE TABLE IF NOT EXISTS `ticket_stack` (
`stack_id` int(11) NOT NULL,
  `stack_name` varchar(25) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `ticket_stack`
--

INSERT INTO `ticket_stack` (`stack_id`, `stack_name`) VALUES
(1, 'Triage');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_status`
--

CREATE TABLE IF NOT EXISTS `ticket_status` (
`status_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `ticket_status`
--

INSERT INTO `ticket_status` (`status_id`, `status`) VALUES
(1, 'Fresh');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`user_id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `type_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE IF NOT EXISTS `user_types` (
`type_id` int(11) NOT NULL,
  `user_type` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
 ADD PRIMARY KEY (`comment_id`), ADD KEY `fk_types_idx` (`type_id`);

--
-- Indexes for table `comment_types`
--
ALTER TABLE `comment_types`
 ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
 ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
 ADD PRIMARY KEY (`profile_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
 ADD PRIMARY KEY (`ticket_id`), ADD KEY `fk_user_idx` (`employee_id`), ADD KEY `fk_user2_idx` (`requestor_id`), ADD KEY `fk_status_idx` (`status_id`), ADD KEY `fk_priority_idx` (`priority_id`), ADD KEY `fk_stack_idx` (`stack_id`);

--
-- Indexes for table `tickets_2_comments`
--
ALTER TABLE `tickets_2_comments`
 ADD PRIMARY KEY (`t2c_id`), ADD KEY `fk_ticket_idx` (`ticket_id`), ADD KEY `fk_comment_idx` (`comment_id`);

--
-- Indexes for table `tickets_2_messages`
--
ALTER TABLE `tickets_2_messages`
 ADD PRIMARY KEY (`t2m_id`), ADD KEY `fk_ticket2_idx` (`ticket_id`), ADD KEY `fk_message_idx` (`message_id`);

--
-- Indexes for table `ticket_priority`
--
ALTER TABLE `ticket_priority`
 ADD PRIMARY KEY (`priority_id`);

--
-- Indexes for table `ticket_stack`
--
ALTER TABLE `ticket_stack`
 ADD PRIMARY KEY (`stack_id`);

--
-- Indexes for table `ticket_status`
--
ALTER TABLE `ticket_status`
 ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`user_id`), ADD KEY `fk_type2_idx` (`type_id`), ADD KEY `fk_profile_idx` (`profile_id`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
 ADD PRIMARY KEY (`type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `comment_types`
--
ALTER TABLE `comment_types`
MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tickets_2_comments`
--
ALTER TABLE `tickets_2_comments`
MODIFY `t2c_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tickets_2_messages`
--
ALTER TABLE `tickets_2_messages`
MODIFY `t2m_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ticket_priority`
--
ALTER TABLE `ticket_priority`
MODIFY `priority_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `ticket_stack`
--
ALTER TABLE `ticket_stack`
MODIFY `stack_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `ticket_status`
--
ALTER TABLE `ticket_status`
MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
ADD CONSTRAINT `fk_types` FOREIGN KEY (`type_id`) REFERENCES `comment_types` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
ADD CONSTRAINT `fk_priority` FOREIGN KEY (`priority_id`) REFERENCES `ticket_priority` (`priority_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_stack` FOREIGN KEY (`stack_id`) REFERENCES `ticket_stack` (`stack_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_status` FOREIGN KEY (`status_id`) REFERENCES `ticket_status` (`status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_user` FOREIGN KEY (`employee_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_user2` FOREIGN KEY (`requestor_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tickets_2_comments`
--
ALTER TABLE `tickets_2_comments`
ADD CONSTRAINT `fk_comment` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tickets_2_messages`
--
ALTER TABLE `tickets_2_messages`
ADD CONSTRAINT `fk_message` FOREIGN KEY (`message_id`) REFERENCES `messages` (`message_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_ticket2` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `fk_profile` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`profile_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_type2` FOREIGN KEY (`type_id`) REFERENCES `user_types` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
