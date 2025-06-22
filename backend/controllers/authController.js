const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'your-secret-key'; // store this in .env

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
    res.status(201).json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ message: 'No user found with that email' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`; // Adjust frontend port if needed

    // Setup email transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      to: email,
      subject: 'Reset your password',
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    res.json({ message: 'Password reset link has been sent to your email.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Find reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Token is invalid or expired' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    // Delete used token
    await prisma.passwordResetToken.delete({
      where: { token },
    });

    res.json({ message: 'Password reset successful. You may now log in.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message });
  }
};
