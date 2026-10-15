import { BadRequestException } from "@nestjs/common";

import { EmailSender } from "./email.sender";

import type { CreateNotificationDto } from "../dto/create.notification.dto";

describe('EmailSender', () => {
    let emailSender: EmailSender;
    let consoleLogSpy: jest.SpyInstance

    beforeEach

})