import Team from "../model/Team";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerTeam = async (req: Request, res: Response) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    try {
        const existingTeam = await Team.findOne({ email });

        if (existingTeam) {
            return res.status(400).json({
                message: "Team Member already registered"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const teamMember = await Team.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                id: teamMember._id,
                name: teamMember.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        teamMember.password = ""
        teamMember.token = token

        return res.status(201).json({
            status: "success",
            teamMember,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const loginTeam = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    try {
        
        const teamMember = await Team.findOne({email});

        if (!teamMember) {
            return res.status(404).json({
                message: "Member not registered"
            });
        }

        const isMatch = await bcrypt.compare(password, teamMember.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: teamMember._id,
                name: teamMember.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        teamMember.token = token
        teamMember.password = ""

        return res.status(200).json({
            status: "success",
            teamMember
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export { registerTeam, loginTeam }

