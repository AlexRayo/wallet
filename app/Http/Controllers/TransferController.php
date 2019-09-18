<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Transfer;
use App\Http\Resources\Transfer as transferResource;

class TransferController extends Controller
{
    public function index()
    {
        //$transfer = Transfer::orderBy('created_at', 'desc')->paginate(10);       
        //$transfer = Transfer::paginate(5);
        $transfer = Transfer::all();
        //return response()->json($transfer);//this returns everything, withoutWrapping
        return transferResource::collection($transfer);//this returns what we set in resources file, wrapped, 
        /*you need to unwrap with some config on appServiceProvider.php
        use Illuminate\Http\Resources\Json\Resource;
        public function boot()
            {
                Resource::withoutWrapping();
            }
        */
    }

    public function store(Request $request)
    {/*
        $this->validate($request,[
            'name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:transfers'],
            'password' => ['string'],
            'role' => ['required', 'string', 'max:10'],
        ]);*/
        $transfer = $request->isMethod('put') ? Transfer::findOrFail($request->transfer_id) : new Transfer;

        $transfer->wallet_id = $request->input('wallet_id');//we don't need it for store new but update
        $transfer->description = $request->input('description');
        $transfer->amount = $request->input('amount');

        if($transfer->save()) {
            return new transferResource($transfer);
        }

    }

    public function destroy($id)
    {
        $transfer = Transfer::findOrFail($id);
        $transfers = Transfer::all();
        if($transfer->delete()) {
            return 'success';
        }    
    }
    public function show($id)
    {
        $transfer = Transfer::findOrFail($id);
        return new transferResource($transfer);
    }
}
