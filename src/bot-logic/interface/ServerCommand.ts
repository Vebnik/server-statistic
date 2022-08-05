import {Systeminformation} from "systeminformation";
import CpuData = Systeminformation.CpuData;
import MemData = Systeminformation.MemData;
import OsData = Systeminformation.OsData;
import NetworkInterfacesData = Systeminformation.NetworkInterfacesData;
import * as cp from 'child_process'


export interface ServerStats {
	cpu: CpuData
	memory: MemData
	os: OsData
	network: Array<NetworkInterfacesData>
}

export interface ProcessStore {
	keys: Array<string>
	values: Array<string>
}