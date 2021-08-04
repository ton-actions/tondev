
import { Command, Terminal } from "../../core";
import { formatTable } from "../../core/utils";
import * as tonosTondev from "@ton-actions/tonos-se-tondev";

export const seInfoCommand: Command = {
    name: "info",
    title: "Show SE Info",
    args: [],
    async run(terminal: Terminal): Promise<void> {
        const table: any[][] = [[
            "State",
            "Version",
            "GraphQL Port",
            "ArangoDB Port",
        ]]

        const info = await tonosTondev.seInfoCommand();
        table.push([
            info.state,
            info.version,
            info.port,
            info.dbPort
        ]);
        terminal.log(formatTable(table, { headerSeparator: true }))
    },
};

export const seVersionCommand: Command = {
    name: "version",
    title: "Show SE Versions",
    async run(terminal: Terminal, _args: {}): Promise<void> {
        const version = await tonosTondev.seVersionCommand();
        terminal.log(`Current version: ${version.current}`);
        terminal.log(`Available Versions: ${(version.availableVersions).join(", ")}`);
    },
};

export const seStartCommand: Command = {
    name: "start",
    title: "Start SE Instance",
    args: [],
    async run(): Promise<void> {
        await tonosTondev.seStartCommand();
    },
};

export const seStopCommand: Command = {
    name: "stop",
    title: "Stop SE Instance",
    args: [],
    async run(): Promise<void> {
        await tonosTondev.seStopCommand();
    },
};


export const seRestartCommand: Command = {
    name: "restart",
    title: "Restart SE Instance",
    args: [],
    async run(): Promise<void> {
        await tonosTondev.seStopCommand();
        await tonosTondev.seStartCommand();
    },
};

export const seResetCommand: Command = {
    name: "reset",
    title: "Reset SE Instance",
    args: [],
    async run(): Promise<void> {
        await tonosTondev.seResetCommand();
    },
};

export const seUpdateCommand: Command = {
    name: "update",
    title: "Update SE Instance Version",
    args: [],
    async run(): Promise<void> {
        await tonosTondev.seUpdateCommand();
    },
};

export const seSetCommand: Command = {
    name: "set",
    title: "Update SE Instance Config",
    args: [
        {
            name: "version",
            title: "SE version (version number or `latest`)",
            type: "string",
            defaultValue: "",
        },
        {
            name: "port",
            title: "Port on localhost used to expose GraphQL API",
            type: "string",
            defaultValue: "",
        },
        {
            name: "db-port",
            title: "Port on localhost used to expose ArangoDB API (number or `none`)",
            type: "string",
            defaultValue: "",
        }
    ],
    async run(_undefined, args: {
        version: string,
        port: string,
        dbPort: string,
        instance: string
    }): Promise<void> {
        if (!args.version && !args.port && !args.dbPort) {
            return;
        }
        await tonosTondev.seSetCommand(args.version, args.port, args.dbPort);
    },
};
