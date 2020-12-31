<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'status'            => 'nullable',
            'customer_id' => 'nullable',
            'status' => 'nullable',
            'notes' => 'nullable',
            'total_price' => 'nullable',
            'date' => 'nullable',
            'prepared_by' => 'nullable',
            'opened_at' => 'nullable',
            'current_status_at' => 'nullable',
            'delivered_by' => 'nullable',
            'order_id' => 'nullable',
            'product_id' => 'nullable',
            'unit_price' => 'nullable',
            'preparation_time' => 'nullable',
            'delivery_time' => 'nullable',
            'total_time' => 'nullable',
        ];
    }
}
