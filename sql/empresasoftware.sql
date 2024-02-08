-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 02-02-2024 a las 16:43:21
-- Versión del servidor: 8.2.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `empresasoftware`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Proyectos`
--

CREATE TABLE `proyectos` (
  `idproyecto` int NOT NULL,
  `nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `f_ini` date NOT NULL,
  `f_fin` date NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Proyectos`
--

INSERT INTO `proyectos` (`idproyecto`, `nombre`, `f_ini`, `f_fin`, `descripcion`) VALUES
(1, 'Proyecto A', '2023-01-01', '2023-06-30', 'Descripción del Proyecto A'),
(2, 'Proyecto B', '2023-02-15', '2023-08-15', 'Descripción del Proyecto B'),
(3, 'Proyecto C', '2023-04-10', '2023-10-31', 'Descripción del Proyecto C'),
(4, 'Proyecto D', '2023-06-20', '2024-01-15', 'Descripción del Proyecto D'),
(5, 'Proyecto E', '2023-08-05', '2024-03-10', 'Descripción del Proyecto E');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Tareas`
--

CREATE TABLE `tareas` (
  `idtarea` int NOT NULL,
  `nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `idproyecto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Tareas`
--

INSERT INTO `tareas` (`idtarea`, `nombre`, `descripcion`, `idproyecto`) VALUES
(1, 'Tarea 1', 'Descripción de la Tarea 1', 1),
(2, 'Tarea 2', 'Descripción de la Tarea 2', 1),
(3, 'Tarea 3', 'Descripción de la Tarea 3', 2),
(4, 'Tarea 4', 'Descripción de la Tarea 4', 2),
(5, 'Tarea 5', 'Descripción de la Tarea 5', 3),
(6, 'Tarea 6', 'Descripción de la Tarea 6', 3),
(7, 'Tarea 7', 'Descripción de la Tarea 7', 4),
(8, 'Tarea 8', 'Descripción de la Tarea 8', 4),
(9, 'Tarea 9', 'Descripción de la Tarea 9', 5),
(10, 'Tarea 10', 'Descripción de la Tarea 10', 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`idproyecto`);

--
-- Indices de la tabla `Tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`idtarea`),
  ADD KEY `fk_proyecto` (`idproyecto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `idproyecto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `Tareas`
--
ALTER TABLE `tareas`
  MODIFY `idtarea` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `fk_proyecto` FOREIGN KEY (`idproyecto`) REFERENCES `proyectos` (`idproyecto`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
