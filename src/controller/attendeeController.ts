import { Request, Response } from "express";
import sendEmail from "../service/emailService";
import Attendee from "../model/Attendee";

const registerAttendee = async (req: Request, res: Response) => {

    const { name, email, branch, phone, question } = req.body;


    if (!name || !email || !branch || !phone) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    try {
        const existingAttendee = await Attendee.findOne({ email });

        if (existingAttendee) {
            return res.status(400).json({
                message: "Attendee already registered"
            });
        }

        const attendee = await Attendee.create({
            name,
            email,
            branch,
            phone,
            question
        });

        const checkInURL = `${process.env.BASE_URL}/attendee/checkin/${attendee._id}`;

        await sendEmail(attendee, checkInURL);

        return res.status(201).json({
            status: "success",
            attendee,
            checkInURL
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const checkInAttendee = async (req: Request, res: Response) => {
    const id  = req.params.id;

    try {
        const attendee = await Attendee.findById(id);

        if (!attendee) {
            return res.status(404).json({
                message: "Attendee not found"
            });
        }

        if (attendee.checkedIn) {
            return res.status(400).json({
                message: "Attendee already checked in"
            });
        }

        attendee.checkedIn = true;
        await attendee.save();

        return res.status(200).json({
            status: "success",
            attendee
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export { registerAttendee, checkInAttendee };