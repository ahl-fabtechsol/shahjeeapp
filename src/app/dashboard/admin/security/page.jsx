"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Eye,
  EyeOff,
  FileText,
  Key,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Save,
  Search,
  Shield,
  Smartphone,
  User,
  Users,
  X,
  Mail,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Sample security logs
const securityLogs = [
  {
    id: "log-1001",
    event: "Login Attempt",
    status: "Success",
    user: "admin@markethub.com",
    ip: "192.168.1.1",
    location: "San Francisco, CA",
    timestamp: "2023-05-01 14:32:45",
  },
  {
    id: "log-1002",
    event: "Password Change",
    status: "Success",
    user: "admin@markethub.com",
    ip: "192.168.1.1",
    location: "San Francisco, CA",
    timestamp: "2023-05-01 14:45:12",
  },
  {
    id: "log-1003",
    event: "Login Attempt",
    status: "Failed",
    user: "admin@markethub.com",
    ip: "103.45.67.89",
    location: "Beijing, China",
    timestamp: "2023-05-01 15:12:33",
  },
  {
    id: "log-1004",
    event: "API Key Generated",
    status: "Success",
    user: "system@markethub.com",
    ip: "192.168.1.5",
    location: "San Francisco, CA",
    timestamp: "2023-05-01 16:03:21",
  },
  {
    id: "log-1005",
    event: "User Role Changed",
    status: "Success",
    user: "admin@markethub.com",
    ip: "192.168.1.1",
    location: "San Francisco, CA",
    timestamp: "2023-05-01 16:45:09",
  },
  {
    id: "log-1006",
    event: "Login Attempt",
    status: "Failed",
    user: "unknown",
    ip: "45.67.89.123",
    location: "Moscow, Russia",
    timestamp: "2023-05-01 17:22:45",
  },
  {
    id: "log-1007",
    event: "2FA Enabled",
    status: "Success",
    user: "admin@markethub.com",
    ip: "192.168.1.1",
    location: "San Francisco, CA",
    timestamp: "2023-05-01 18:11:32",
  },
  {
    id: "log-1008",
    event: "System Backup",
    status: "Success",
    user: "system",
    ip: "192.168.1.5",
    location: "San Francisco, CA",
    timestamp: "2023-05-01 23:00:00",
  },
];

export default function AdminSecurityPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [showAPIKey, setShowAPIKey] = useState(false);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Security</h1>
            <p className="text-muted-foreground">
              Manage platform security settings and access controls.
            </p>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Password Policy</CardTitle>
                    <CardDescription>
                      Configure password requirements for all users
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-length">
                        Minimum Password Length
                      </Label>
                      <Input id="min-length" type="number" defaultValue="8" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="require-uppercase">
                          Require Uppercase Letters
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          At least one uppercase letter
                        </p>
                      </div>
                      <Switch id="require-uppercase" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="require-numbers">Require Numbers</Label>
                        <p className="text-sm text-muted-foreground">
                          At least one number
                        </p>
                      </div>
                      <Switch id="require-numbers" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="require-symbols">
                          Require Special Characters
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          At least one special character
                        </p>
                      </div>
                      <Switch id="require-symbols" defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-expiry">
                        Password Expiry (days)
                      </Label>
                      <Input
                        id="password-expiry"
                        type="number"
                        defaultValue="90"
                      />
                      <p className="text-sm text-muted-foreground">
                        0 = never expires
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-history">Password History</Label>
                      <Input
                        id="password-history"
                        type="number"
                        defaultValue="5"
                      />
                      <p className="text-sm text-muted-foreground">
                        Number of previous passwords that cannot be reused
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Session Security</CardTitle>
                    <CardDescription>
                      Configure session and login settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">
                        Session Timeout (minutes)
                      </Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        defaultValue="30"
                      />
                      <p className="text-sm text-muted-foreground">
                        0 = never timeout
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="concurrent-sessions">
                          Allow Concurrent Sessions
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow users to be logged in on multiple devices
                        </p>
                      </div>
                      <Switch id="concurrent-sessions" defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-login-attempts">
                        Maximum Login Attempts
                      </Label>
                      <Input
                        id="max-login-attempts"
                        type="number"
                        defaultValue="5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lockout-duration">
                        Account Lockout Duration (minutes)
                      </Label>
                      <Input
                        id="lockout-duration"
                        type="number"
                        defaultValue="15"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="force-logout">
                          Force Logout on Password Change
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Log users out when they change their password
                        </p>
                      </div>
                      <Switch id="force-logout" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>API Security</CardTitle>
                    <CardDescription>
                      Configure API security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <div className="flex">
                        <div className="relative flex-1">
                          <Input
                            id="api-key"
                            type={showAPIKey ? "text" : "password"}
                            defaultValue="sk_live_51KjHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                            className="pr-10"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setShowAPIKey(!showAPIKey)}
                          >
                            {showAPIKey ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <Button variant="outline" size="icon" className="ml-2">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="api-rate-limiting">
                          API Rate Limiting
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Limit API requests per client
                        </p>
                      </div>
                      <Switch id="api-rate-limiting" defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-rate-limit">
                        Rate Limit (requests/minute)
                      </Label>
                      <Input
                        id="api-rate-limit"
                        type="number"
                        defaultValue="100"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="api-ip-whitelist">
                          IP Whitelisting
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Restrict API access to specific IPs
                        </p>
                      </div>
                      <Switch id="api-ip-whitelist" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-whitelist">
                        Whitelisted IPs (comma separated)
                      </Label>
                      <Textarea
                        id="api-whitelist"
                        placeholder="192.168.1.1, 10.0.0.1"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" /> Regenerate API Key
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Security Notifications</CardTitle>
                    <CardDescription>
                      Configure security alert notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify-login-attempts">
                          Failed Login Attempts
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notify on suspicious login attempts
                        </p>
                      </div>
                      <Switch id="notify-login-attempts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify-password-changes">
                          Password Changes
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when passwords are changed
                        </p>
                      </div>
                      <Switch id="notify-password-changes" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify-new-devices">
                          New Device Logins
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when users log in from new devices
                        </p>
                      </div>
                      <Switch id="notify-new-devices" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify-role-changes">
                          Role Changes
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when user roles are modified
                        </p>
                      </div>
                      <Switch id="notify-role-changes" defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="security-email">Security Email</Label>
                      <Input
                        id="security-email"
                        defaultValue="security@markethub.com"
                      />
                      <p className="text-sm text-muted-foreground">
                        Email address for security notifications
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="authentication" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Configure 2FA settings for your platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-2fa">
                        Enable Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all users
                      </p>
                    </div>
                    <Switch id="enable-2fa" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>2FA Methods</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Authenticator App</h4>
                            <p className="text-sm text-muted-foreground">
                              Google Authenticator, Authy, etc.
                            </p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">SMS Authentication</h4>
                            <p className="text-sm text-muted-foreground">
                              Text message verification codes
                            </p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <Key className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Security Keys</h4>
                            <p className="text-sm text-muted-foreground">
                              YubiKey, Google Titan, etc.
                            </p>
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Email Authentication
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Email verification codes
                            </p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enforce-2fa-admins">
                        Enforce 2FA for Admins
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Always require 2FA for admin accounts
                      </p>
                    </div>
                    <Switch id="enforce-2fa-admins" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="2fa-grace-period">
                      2FA Grace Period (days)
                    </Label>
                    <Input
                      id="2fa-grace-period"
                      type="number"
                      defaultValue="7"
                    />
                    <p className="text-sm text-muted-foreground">
                      Time allowed to set up 2FA after it's required
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Single Sign-On (SSO)</CardTitle>
                  <CardDescription>
                    Configure SSO providers for your platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-sso">Enable Single Sign-On</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow users to log in with SSO providers
                      </p>
                    </div>
                    <Switch id="enable-sso" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>SSO Providers</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Google</h4>
                            <p className="text-sm text-muted-foreground">
                              Sign in with Google account
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            Active
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Microsoft</h4>
                            <p className="text-sm text-muted-foreground">
                              Sign in with Microsoft account
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            Active
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Apple</h4>
                            <p className="text-sm text-muted-foreground">
                              Sign in with Apple ID
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-gray-50 text-gray-700 border-gray-200"
                          >
                            Inactive
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">SAML</h4>
                            <p className="text-sm text-muted-foreground">
                              Enterprise SAML integration
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-gray-50 text-gray-700 border-gray-200"
                          >
                            Inactive
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> Add SSO Provider
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Advanced Authentication Settings</CardTitle>
                  <CardDescription>
                    Configure additional authentication security measures
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Login Security</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="captcha">CAPTCHA Protection</Label>
                          <p className="text-sm text-muted-foreground">
                            Protect login forms with CAPTCHA
                          </p>
                        </div>
                        <Switch id="captcha" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="suspicious-detection">
                            Suspicious Activity Detection
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Detect and block suspicious login attempts
                          </p>
                        </div>
                        <Switch id="suspicious-detection" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="geo-fencing">Geo-fencing</Label>
                          <p className="text-sm text-muted-foreground">
                            Restrict logins to specific countries
                          </p>
                        </div>
                        <Switch id="geo-fencing" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="allowed-countries">
                          Allowed Countries
                        </Label>
                        <Select defaultValue="all">
                          <SelectTrigger id="allowed-countries">
                            <SelectValue placeholder="Select countries" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Countries</SelectItem>
                            <SelectItem value="us">
                              United States Only
                            </SelectItem>
                            <SelectItem value="us-eu">US and Europe</SelectItem>
                            <SelectItem value="custom">
                              Custom Selection
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Password Recovery</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="password-reset">
                            Allow Password Reset
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Enable self-service password recovery
                          </p>
                        </div>
                        <Switch id="password-reset" defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reset-token-expiry">
                          Reset Token Expiry (minutes)
                        </Label>
                        <Input
                          id="reset-token-expiry"
                          type="number"
                          defaultValue="15"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="security-questions">
                            Require Security Questions
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Ask security questions during password recovery
                          </p>
                        </div>
                        <Switch id="security-questions" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="admin-reset-only">
                            Admin Reset Only
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Only admins can reset passwords
                          </p>
                        </div>
                        <Switch id="admin-reset-only" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Authentication Policies
                    </h3>
                    <div className="space-y-2">
                      <Label>Default Authentication Method</Label>
                      <RadioGroup
                        defaultValue="password"
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="password" id="auth-password" />
                          <Label htmlFor="auth-password">
                            Username and Password
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sso" id="auth-sso" />
                          <Label htmlFor="auth-sso">Single Sign-On (SSO)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="passwordless"
                            id="auth-passwordless"
                          />
                          <Label htmlFor="auth-passwordless">
                            Passwordless Authentication
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="remember-me">Allow "Remember Me"</Label>
                        <p className="text-sm text-muted-foreground">
                          Let users stay logged in between sessions
                        </p>
                      </div>
                      <Switch id="remember-me" defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="remember-duration">
                        Remember Me Duration (days)
                      </Label>
                      <Input
                        id="remember-duration"
                        type="number"
                        defaultValue="30"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="access" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Role Management</CardTitle>
                  <CardDescription>
                    Configure user roles and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Administrator</h4>
                        <p className="text-sm text-muted-foreground">
                          Full system access
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Moderator</h4>
                        <p className="text-sm text-muted-foreground">
                          Content and user management
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Seller</h4>
                        <p className="text-sm text-muted-foreground">
                          Seller dashboard access
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Customer</h4>
                        <p className="text-sm text-muted-foreground">
                          Basic account access
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> Add Custom Role
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Permission Settings</CardTitle>
                  <CardDescription>
                    Configure system-wide permission settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="role-based-access">
                        Role-Based Access Control
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Enforce role-based permissions
                      </p>
                    </div>
                    <Switch id="role-based-access" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="granular-permissions">
                        Granular Permissions
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Enable fine-grained permission control
                      </p>
                    </div>
                    <Switch id="granular-permissions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="permission-inheritance">
                        Permission Inheritance
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow roles to inherit permissions
                      </p>
                    </div>
                    <Switch id="permission-inheritance" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-role">Default User Role</Label>
                    <Select defaultValue="customer">
                      <SelectTrigger id="default-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="admin-approval">
                        Require Admin Approval for Role Changes
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Admin must approve role changes
                      </p>
                    </div>
                    <Switch id="admin-approval" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Access Control Lists</CardTitle>
                  <CardDescription>
                    Configure access control for system resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="users">
                    <TabsList className="grid grid-cols-4 w-full mb-4">
                      <TabsTrigger value="users">User Management</TabsTrigger>
                      <TabsTrigger value="products">
                        Product Management
                      </TabsTrigger>
                      <TabsTrigger value="orders">Order Management</TabsTrigger>
                      <TabsTrigger value="system">System Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="users" className="space-y-4">
                      <div className="border rounded-md">
                        <div className="grid grid-cols-5 bg-muted p-3 rounded-t-md font-medium">
                          <div className="col-span-2">Permission</div>
                          <div className="text-center">Admin</div>
                          <div className="text-center">Moderator</div>
                          <div className="text-center">Seller</div>
                        </div>
                        <div className="divide-y">
                          <div className="grid grid-cols-5 p-3 items-center">
                            <div className="col-span-2">
                              <div className="font-medium">View Users</div>
                              <div className="text-sm text-muted-foreground">
                                Access to view user profiles
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="flex justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="flex justify-center">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                          </div>
                          <div className="grid grid-cols-5 p-3 items-center">
                            <div className="col-span-2">
                              <div className="font-medium">Create Users</div>
                              <div className="text-sm text-muted-foreground">
                                Ability to create new users
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="flex justify-center">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="flex justify-center">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                          </div>
                          <div className="grid grid-cols-5 p-3 items-center">
                            <div className="col-span-2">
                              <div className="font-medium">Edit Users</div>
                              <div className="text-sm text-muted-foreground">
                                Ability to modify user profiles
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="flex justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="flex justify-center">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                          </div>
                          <div className="grid grid-cols-5 p-3 items-center">
                            <div className="col-span-2">
                              <div className="font-medium">Delete Users</div>
                              <div className="text-sm text-muted-foreground">
                                Ability to remove users
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="flex justify-center">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="flex justify-center">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                          </div>
                          <div className="grid grid-cols-5 p-3 items-center">
                            <div className="col-span-2">
                              <div className="font-medium">Assign Roles</div>
                              <div className="text-sm text-muted-foreground">
                                Ability to change user roles
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="flex justify-center">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="flex justify-center">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="products" className="space-y-4">
                      {/* Product management permissions would go here */}
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2" />
                        <p>Select a different tab to view more permissions</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="orders" className="space-y-4">
                      {/* Order management permissions would go here */}
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2" />
                        <p>Select a different tab to view more permissions</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="system" className="space-y-4">
                      {/* System settings permissions would go here */}
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2" />
                        <p>Select a different tab to view more permissions</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button>Save Permission Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Logs</CardTitle>
                <CardDescription>
                  View and analyze security-related events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search logs..."
                      className="pl-8"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="login">Login Attempts</SelectItem>
                        <SelectItem value="password">
                          Password Changes
                        </SelectItem>
                        <SelectItem value="role">Role Changes</SelectItem>
                        <SelectItem value="api">API Access</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border rounded-md">
                  <div className="grid grid-cols-6 bg-muted p-3 rounded-t-md font-medium text-sm">
                    <div>Event</div>
                    <div>Status</div>
                    <div>User</div>
                    <div>IP Address</div>
                    <div>Location</div>
                    <div>Timestamp</div>
                  </div>
                  <div className="divide-y">
                    {securityLogs.map((log) => (
                      <div
                        key={log.id}
                        className="grid grid-cols-6 p-3 text-sm"
                      >
                        <div>{log.event}</div>
                        <div>
                          {log.status === "Success" ? (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              Success
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200"
                            >
                              Failed
                            </Badge>
                          )}
                        </div>
                        <div>{log.user}</div>
                        <div>{log.ip}</div>
                        <div>{log.location}</div>
                        <div>{log.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing 8 of 256 logs
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" /> Export Logs
                </Button>
                <Button variant="outline">
                  <ArrowRight className="h-4 w-4 mr-2" /> View All Logs
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
